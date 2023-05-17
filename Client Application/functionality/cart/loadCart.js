import getNewTokens from '../../functionality/modules/refreshTokens.mjs';
import cartProductHtml from '../modules/cartHtmlElement.mjs';
import getDate from '../../functionality/modules/getDate.mjs';

const tbody = document.getElementById('tbody');
const subtotalPriceField = document.querySelector(
    '.price_menu .subtotal_price_wrapper .subtotal'
);
const totalPriceField = document.querySelector(
    '.price_menu .total_price_wrapper .total'
);
const RETRIEVE_PRODUCTS_URL = 'http://127.0.0.1:8000/cart/products/';

window.addEventListener('DOMContentLoaded', async () => {
    await loadProducts();
    const removeBtns = [...document.querySelectorAll('#remove_item_btn')];
    removeBtns.forEach((x) => x.addEventListener('click', removeProduct));
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
    subtotalPriceField.textContent =
        totalPriceField.textContent = `${TOTAL_PRICE}lv.`;
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
        localStorage.setItem('totalPrice', (localStorage.getItem('totalPrice') - productPrice * productCount).toFixed(2))
        localStorage.setItem('cartItem', localStorage.getItem('cartItem') - productCount);
        window.location.reload();
    }

}
