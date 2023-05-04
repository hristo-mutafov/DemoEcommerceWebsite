const myPorfile = () => {
    window.location.href = '../../pages/profile/profile.html'
}

const toProfileSettings = () => {
    window.location.href = '../../pages/profile/profile_settings.html'
};

const toAddressSettings = () => {
    window.location.href = '../../pages/profile/profile_addresses.html'
};

const toOrderSettings = () => {
    console.log('here');
};

const logout = () => {
    localStorage.removeItem('refresh');
    localStorage.removeItem('access');
    window.location.href = '/';
};

window.addEventListener('load', () => {
    const token = localStorage.getItem('refresh')
    if (!token) {
        window.location.href = '/';
    }
})

const currentPage = document.getElementById('my_profile')
const settingsBtn = document.getElementById('profile_settings');
const addressBtn = document.getElementById('profile_addresses');
const ordersBtn = document.getElementById('profile_orders');
const logoutBtn = document.getElementById('profile_logout');

settingsBtn.addEventListener('click', toProfileSettings);
addressBtn.addEventListener('click', toAddressSettings);
ordersBtn.addEventListener('click', toOrderSettings);
logoutBtn.addEventListener('click', logout);
if (currentPage) {
    currentPage.addEventListener('click', myPorfile)
}