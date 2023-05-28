import getDate from '../modules/getDate.mjs';
import getNewTokens from '../modules/refreshTokens.mjs';

const nameInputs = document.getElementById('name_field')
const phoneNumberField = document.getElementById('phone_field')
const addressInput = document.getElementById('address_field')
const priceFileds = Array.from(document.querySelectorAll('.method #price'))
window.addEventListener('load', onLoad);

async function onLoad() {
    fillDates();
    await fillInputs();
    fillPrices()
}

function fillDates() {
    const earlyDates = Array.from(document.querySelectorAll('#early'));
    const lateDates = Array.from(document.querySelectorAll('#late'));

    for (const field of earlyDates) {
        field.textContent = getDate(2);
    }

    for (const field of lateDates) {
        field.textContent = getDate(4);
    }
}

async function fillInputs() {
    const fRes = await fetch('http://127.0.0.1:8000/user/', {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + localStorage.getItem('access') },
    });
    if (fRes.status === 401) {
        await getNewTokens(localStorage.getItem('refresh'));
        return fillInputs()
    }
    const {first_name, last_name, address, phone_number, city} = await fRes.json()
    if (first_name && last_name) {
        nameInputs.value = `${first_name} ${last_name}`
    }

    if (phone_number) {
        phoneNumberField.value = phone_number
    }

    if (address && city) {
        addressInput.value = `${city}, ${address}`
    }
}

function fillPrices() {
    for (const field of priceFileds) {
        field.textContent = `${localStorage.getItem('totalPrice')}lv`
    }
}
