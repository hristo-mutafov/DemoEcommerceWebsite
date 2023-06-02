import getNewTokens from '../../functionality/modules/refreshTokens.mjs';
import cartProductHtml from '../modules/cartHtmlElement.mjs';
import getDate from '../../functionality/modules/getDate.mjs';
import editHeaderCountAndPrice from '../../functionality/modules/editHeaderCountAndPrice.mjs';

const tbody = document.getElementById('tbody');
const emptyCartSection = document.querySelector('#main.cart_page .empty_cart');
const cartSection = document.querySelector('#main.cart_page .main_section');
const subtotalPriceField = document.querySelector(
    '.price_menu .subtotal_price_wrapper .subtotal'
);
const totalPriceField = document.querySelector(
    '.price_menu .total_price_wrapper .total'
);
const orderButton = document.getElementById('go_to_finish_btn');
const RETRIEVE_PRODUCTS_URL = 'http://127.0.0.1:8000/cart/products/';

window.addEventListener('load', async () => {
    await loadProducts();
    orderButton.addEventListener('click', () => {
        window.location.href = '../../pages/order/order.html';
    });
    const removeBtns = [...document.querySelectorAll('#remove_item_btn')];
    const decreaseProductCountButtons =
        document.querySelectorAll('#decrease_btn');
    const increaseProductCountButtons =
        document.querySelectorAll('#increase_btn');
    removeBtns.forEach((x) => x.addEventListener('click', removeProduct));
    decreaseProductCountButtons.forEach((x) => {
        x.addEventListener('click', decreaseQuantity);
    });
    increaseProductCountButtons.forEach((x) => {
        x.addEventListener('click', increseQuantity);
    });
});

async function loadProducts() {
    let TOTAL_PRICE = 0;

    const fRes = await fetch(RETRIEVE_PRODUCTS_URL, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('access') },
    });
    if (fRes.status === 401) {
        await getNewTokens(localStorage.getItem('refresh'));
        return loadProducts();
    }
    const jsonRes = await fRes.json();
    for (const product of jsonRes) {
        const { id, image, brand, name, price } = product.product;
        const productCount = product.count;

        tbody.innerHTML += cartProductHtml();
        const currentTrParent = tbody.children[tbody.children.length - 1];
        currentTrParent.id = id;
        currentTrParent.querySelector('#product_image').src = image;
        currentTrParent.querySelector(
            '#product_name.product_name'
        ).textContent = name;
        currentTrParent.querySelector('#product_brand.brand').textContent =
            brand;
        currentTrParent.querySelector('#product_delivery_date').textContent =
            getDate(4);

        currentTrParent.querySelector(
            '.count_wrapper .product_count'
        ).textContent = productCount;

        let [bigPrice, smallPrice] = price.split('.');
        currentTrParent.querySelector(
            '#single_price_sec #bigPrice'
        ).textContent = bigPrice;
        currentTrParent.querySelector(
            '#single_price_sec #smallPrice'
        ).textContent = smallPrice;

        const productTotalPrice = Number(productCount * price).toFixed(2);
        [bigPrice, smallPrice] = productTotalPrice.split('.');
        currentTrParent.querySelector(
            '#total_price_sec #bigPrice'
        ).textContent = bigPrice;
        currentTrParent.querySelector(
            '#total_price_sec #smallPrice'
        ).textContent = smallPrice;

        TOTAL_PRICE += Number(price) * Number(productCount);
    }
    if (!jsonRes.length) {
        emptyCartSection.classList.add('active');
        cartSection.classList.add('disabled');
    }

    subtotalPriceField.textContent =
        totalPriceField.textContent = `${TOTAL_PRICE.toFixed(2)}lv.`;
}

async function removeProduct() {
    const parentTr = this.parentNode.parentNode;
    const productId = this.parentNode.parentNode.id;
    const productCount = Number(
        parentTr.querySelector('.count_wrapper .product_count').textContent
    );
    const productPrice =
        Number(
            parentTr.querySelector('#single_price_sec #bigPrice').textContent
        ) +
        Number(
            '0.' +
                parentTr.querySelector('#single_price_sec #smallPrice')
                    .textContent
        );

    const REMOVE_PRODUCT_URL = `http://127.0.0.1:8000/cart/remove/${productId}/`;
    const fRes = await fetch(REMOVE_PRODUCT_URL, {
        method: 'PATCH',
        headers: { Authorization: 'Bearer ' + localStorage.getItem('access') },
    });

    if (fRes.status === 401) {
        await getNewTokens(localStorage.getItem('refresh'));
        return removeProduct();
    } else {
        localStorage.setItem(
            'totalPrice',
            (
                localStorage.getItem('totalPrice') -
                productPrice * productCount
            ).toFixed(2)
        );
        localStorage.setItem(
            'cartItem',
            localStorage.getItem('cartItem') - productCount
        );
        window.location.reload();
    }
}

async function decreaseQuantity() {
    const countField = this.parentNode.querySelector('.product_count');
    if (countField.textContent !== '1') {
        const parentTr = this.parentNode.parentNode.parentNode;
        const productId = parentTr.id;
        const DECREASE_PRODUCT_QUANTITY_URL = `http://127.0.0.1:8000/cart/substract/${productId}/`;
        const fRes = await fetch(DECREASE_PRODUCT_QUANTITY_URL, {
            method: 'PATCH',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('access'),
            },
        });
        if (fRes.status === 401) {
            await getNewTokens(localStorage.getItem('refresh'));
            return decreaseQuantity();
        }
        const productPrice =
            Number(
                parentTr.querySelector('#single_price_sec #bigPrice')
                    .textContent
            ) +
            Number(
                '0.' +
                    parentTr.querySelector('#single_price_sec #smallPrice')
                        .textContent
            );
        editHeaderCountAndPrice(productPrice, true);
        window.location.reload();
    }
}

async function increseQuantity() {
    const parentTr = this.parentNode.parentNode.parentNode;
    const productId = parentTr.id;
    const DECREASE_PRODUCT_QUANTITY_URL = `http://127.0.0.1:8000/cart/add/${productId}/`;
    const fRes = await fetch(DECREASE_PRODUCT_QUANTITY_URL, {
        method: 'PATCH',
        headers: { Authorization: 'Bearer ' + localStorage.getItem('access') },
    });
    if (fRes.status === 401) {
        await getNewTokens(localStorage.getItem('refresh'));
        return increseQuantity();
    }
    const productPrice =
        Number(
            parentTr.querySelector('#single_price_sec #bigPrice').textContent
        ) +
        Number(
            '0.' +
                parentTr.querySelector('#single_price_sec #smallPrice')
                    .textContent
        );
    editHeaderCountAndPrice(productPrice);
    window.location.reload();
}
