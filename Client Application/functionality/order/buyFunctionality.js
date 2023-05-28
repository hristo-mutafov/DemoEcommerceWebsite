const buyButton = document.getElementById('finish_order_btn');
const paymentForm = document.getElementById('paymentForm');

const cardInformationFields = {
    cardNumber: document.getElementById('cardNumberField'),
    expMonth: document.getElementById('expireMM'),
    expYear: document.getElementById('expireYY'),
    cvc: document.getElementById('cvcField'),
};

buyButton.addEventListener('click', buyProducts);

function buyProducts() {
    for (const field of Array.from(document.querySelectorAll('*'))) {
        field.classList.remove('wrong');
    }
    if (checkFields()) {

    }
}

function checkFields() {
    const deliveryFields = {
        name: document.getElementById('name_field'),
        phone: document.getElementById('phone_field'),
        address: document.getElementById('address_field'),
    };

    let allValid = true;
    for (const deliveryField in deliveryFields) {
        if (!deliveryFields[deliveryField].value) {
            deliveryFields[deliveryField].classList.add('wrong');
            allValid = false;
        }
    }
    if (paymentForm.querySelector('input:checked').id === 'strypes_payment') {
        const cardInformationFields = {
            cardNumber: document.getElementById('cardNumberField'),
            expMonth: document.getElementById('expireMM'),
            expYear: document.getElementById('expireYY'),
            cvc: document.getElementById('cvcField'),
        };
        for (const cardField in cardInformationFields) {
            if (!cardInformationFields[cardField].value) {
                cardInformationFields[cardField].classList.add('wrong');
                allValid = false;
            }
            if (
                cardInformationFields[cardField].id === 'cardNumberField' &&
                cardInformationFields[cardField].value.length !== 16
            ) {
                cardInformationFields[cardField].classList.add('wrong');
                allValid = false;
            }
            if (
                cardInformationFields[cardField].id === 'cvcField' &&
                cardInformationFields[cardField].value.length !== 3
            ) {
                cardInformationFields[cardField].classList.add('wrong');
                allValid = false;
            }
        }
    }

    return allValid
}
