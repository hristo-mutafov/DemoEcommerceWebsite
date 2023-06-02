import getNewTokens from '../modules/refreshTokens.mjs';
import domFactory from '../modules/domConstructor.mjs';

const dateField = document.getElementById('dateField');
const orderNumber = document.getElementById('orderNumber');
const orderPrice = document.getElementById('orderPrice');
const orderAddress = document.getElementById('orderAddress');
const orderPaymentMethod = document.getElementById('orderPaymentMethod');
const orderPrice2 = document.getElementById('orderPrice2');
const productWrapper = document.getElementById('productWrapper');

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('order');

window.addEventListener('load', controller);

async function controller() {
    await loadOrder();
    await loadProducts();
}

async function loadOrder() {
    const URL = `http://127.0.0.1:8000/orders/${myParam}/`;
    const fRes = await fetch(URL, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('access') },
    });
    if (fRes.status === 401) {
        await getNewTokens(localStorage.getItem('refresh'));
        return loadOrder();
    }
    const jsonRes = await fRes.json();
    const { order_number, date, address, payment_method, price } = jsonRes;
    orderNumber.textContent = order_number;
    dateField.textContent = date;
    orderAddress.textContent = address;
    orderPrice.textContent = `${price}lv`;
    orderPrice2.textContent = `${price}lv`;
    if (payment_method === 'cash_on_delivery') {
        orderPaymentMethod.textContent = 'Cash On Delivery';
    } else {
        orderPaymentMethod.textContent = 'Stripe';
    }
}

async function loadProducts() {
    const URL = `http://127.0.0.1:8000/orders/products/${myParam}/`;
    const fRes = await fetch(URL, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('access') },
    });
    if (fRes.status === 401) {
        await getNewTokens(localStorage.getItem('refresh'));
        return loadOrder();
    }
    const jsonRes = await fRes.json();
    for (const theProduct of jsonRes) {
        const { count, product } = theProduct;
        const { image, name, price } = product;
        const wrapper = domFactory('div', null, productWrapper, {
            'class': 'product_field',
        });
        domFactory('img', null, wrapper, { src: image });
        const dataWrapper = domFactory('div', null, wrapper, {
            class: 'product_wrapper',
        });
        domFactory('p', name, dataWrapper, {'class': 'title'})
        domFactory('p', `Price: ${price}lv`, dataWrapper, {'class': 'price'})
        domFactory('p', `Quantity: ${count}`, dataWrapper, {'class': 'quantity'})
    }
}
