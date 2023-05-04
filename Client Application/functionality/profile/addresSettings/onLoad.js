import isAuthenticated from '../../modules/isAuthenticated.mjs';
import getNewTokens from '../../modules/refreshTokens.mjs';
import parseJwt from '../../modules/getUserId.mjs';

const loadData = async () => {
    const fRes = await fetch(BASE_URL, {
        method: 'GET',
        headers: { Authorization: `Bearer ${localStorage.getItem('access')}` },
    });
    if (fRes.status === 401) {
        await getNewTokens(localStorage.getItem('refresh'));
        loadData();
    } else {
        const jsonRes = await fRes.json();
        if (jsonRes.city) {
            cityField.textContent = jsonRes.city;
        }
        if (jsonRes.address) {
            addressField.textContent = jsonRes.address;
        }
        if (jsonRes.phone_number) {
            phoneNumberField.textContent = jsonRes.phone_number
        }
    }
};

const authenticated = await isAuthenticated();
if (!authenticated) {
    window.location.href = '/';
}

const userId = parseJwt(localStorage.getItem('access')).user_id;
const BASE_URL = `http://127.0.0.1:8000/user/${userId}`;

const cityField = document.getElementById('city_field');
const addressField = document.getElementById('address_field');
const phoneNumberField = document.getElementById('phone_number_field');

window.addEventListener('load', loadData);
