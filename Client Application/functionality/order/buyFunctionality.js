import getNewTokens from '../modules/refreshTokens.mjs';
import { stripe, cardElement } from './loadData.js';

const buyButton = document.getElementById('finish_order_btn');
const paymentForm = document.getElementById('paymentForm');

const deliveryFields = {
    name: document.getElementById('name_field'),
    phone: document.getElementById('phone_field'),
    address: document.getElementById('address_field'),
};

const errorMessageFeld = document.querySelector(
    '.additional .method .error_message'
);

let clientSecret = false;

buyButton.addEventListener('click', buyProducts);

async function buyProducts() {
    for (const field of Array.from(document.querySelectorAll('*'))) {
        field.classList.remove('wrong');
        errorMessageFeld.textContent = '';
    }
    if (checkFields()) {
        if (
            paymentForm.querySelector('input:checked').id === 'strypes_payment'
        ) {
            if (!clientSecret) {
                clientSecret = await getClientSecret()
            }
            const status = await payWithStipe();
            if (status) {
                await createOrder('cash_on_delivery');
            }
        } else {
            await createOrder('cash_on_delivery');
        }
    }
}

function checkFields() {
    let allValid = true;
    for (const deliveryField in deliveryFields) {
        if (!deliveryFields[deliveryField].value) {
            deliveryFields[deliveryField].classList.add('wrong');
            allValid = false;
        }
    }
    // if (paymentForm.querySelector('input:checked').id === 'strypes_payment') {
    //     cardInformationFields = {
    //         cardNumber: document.getElementById('cardNumberField'),
    //         expMonth: document.getElementById('expireMM'),
    //         expYear: document.getElementById('expireYY'),
    //         cvc: document.getElementById('cvcField'),
    //     };
    //     for (const cardField in cardInformationFields) {
    //         if (!cardInformationFields[cardField].value) {
    //             cardInformationFields[cardField].classList.add('wrong');
    //             allValid = false;
    //         }
    //         if (
    //             cardInformationFields[cardField].id === 'cardNumberField' &&
    //             cardInformationFields[cardField].value.length !== 16
    //         ) {
    //             cardInformationFields[cardField].classList.add('wrong');
    //             allValid = false;
    //         }
    //         if (
    //             cardInformationFields[cardField].id === 'cvcField' &&
    //             cardInformationFields[cardField].value.length !== 3
    //         ) {
    //             cardInformationFields[cardField].classList.add('wrong');
    //             allValid = false;
    //         }
    //     }
    // }

    return allValid;
}

async function createOrder(paymentMethod) {
    const URL = 'http://127.0.0.1:8000/orders/create/';
    const body = JSON.stringify({
        payment_method: paymentMethod,
        address: deliveryFields.address.value,
    });
    const fRes = await fetch(URL, {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access'),
            'Content-Type': 'application/json',
        },
        body: body,
    });
    if (fRes.status === 401) {
        await getNewTokens(localStorage.getItem('refresh'));
        return createOrder(paymentMethod);
    }
    localStorage.setItem('cartItem', '');
    localStorage.setItem('totalPrice', '');

    window.location.href = '../../pages/order/finishedOrderPage.html';
}

async function payWithStipe() {
    const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: deliveryFields.name.value,
                },
            },
        }
    );
    if (error) {
        errorMessageFeld.textContent = error.message;
    } else {
        return true;
    }
}

async function getClientSecret() {
    const URL = 'http://127.0.0.1:8000/orders/pay/';
    const fRes = await fetch(URL, {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + localStorage.getItem('access') },
    });
    if (fRes.status === 401) {
        await getNewTokens(localStorage.getItem('refresh'));
        return payWithStipe();
    }
    const jsonRes = await fRes.json();
    return jsonRes.client_secret;
}
