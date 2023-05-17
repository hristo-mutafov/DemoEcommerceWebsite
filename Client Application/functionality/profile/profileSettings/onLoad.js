import isAuthenticated from '../../modules/isAuthenticated.mjs';
import getNewTokens from '../../modules/refreshTokens.mjs';

const loadData = async () => {
    const fRes = await fetch(BASE_URL, {
        method: 'GET',
        headers: { Authorization: `Bearer ${localStorage.getItem('access')}` },
    });
    if (fRes.status === 401) {
        await getNewTokens(localStorage.getItem('refresh'));
        return loadData();
    } else {
        const jsonRes = await fRes.json();
        if (jsonRes.first_name || jsonRes.last_name) {
            nameField.textContent = `${jsonRes.first_name} ${jsonRes.last_name}`;
        }
        emailField.textContent = jsonRes.email;
        emailInput.value = jsonRes.email;
        firstNameInput.value = jsonRes.first_name;
        lastNameInput.value = jsonRes.last_name;
    }
};

const authenticated = await isAuthenticated();
if (!authenticated) {
    window.location.href = '/';
}

const BASE_URL = `http://127.0.0.1:8000/user/`;
const nameField = document.getElementById('name_field');
const emailField = document.getElementById('email_field');
const firstNameInput = document.getElementById('first_name');
const lastNameInput = document.getElementById('last_name');
const emailInput = document.getElementById('emailInput');

window.addEventListener('load', loadData);
