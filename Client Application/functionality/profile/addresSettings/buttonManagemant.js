import isEmpty from '../../modules/formIsEmpty.mjs';

// Getting global info
const BASE_EDIT_URL = `http://127.0.0.1:8000/user/`

const main = document.getElementById('main')
// Getting buttons
const editCityBtn = document.getElementById('edit_city_btn')
const editAddressBtn = document.getElementById('edit_address_btn')
const editPhoneNumberBtn = document.getElementById('edit_phone_number_btn')

// Getting the panels
const editCityPanel = document.getElementById('edit_city_panel')
const editAddressPanel = document.getElementById('edit_address_panel')
const editPhoneNumberPanel = document.getElementById('edit_phone_number_panel')

//Attach click events for pop up the panels
editCityBtn.addEventListener('click', () => {
    editCityPanel.classList.add('active');
    main.classList.add('active')
})

editAddressBtn.addEventListener('click', () => {
    editAddressPanel.classList.add('active');
    main.classList.add('active')
})

editPhoneNumberBtn.addEventListener('click', () => {
    editPhoneNumberPanel.classList.add('active');
    main.classList.add('active')
})

// Getting save buttons
const saveCityBtn = document.getElementById('saveCity')
const saveAddressBtn = document.getElementById('saveAddress')
const savePhoneNumber = document.getElementById('savePhoneNumber')

// Crete the funtionality
saveCityBtn.addEventListener('click', () => {
    const errorMassage = document.querySelector('#edit_city_panel .error_message')
    errorMassage.style.display = 'none'
    const fields = {
        cityField: document.querySelector('#edit_city_panel #cityField'),
    }

    if (!isEmpty(fields)) {
        errorMassage.style.display = 'block'
        return
    }

    fetch(BASE_EDIT_URL, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('access'),
        },
        body: JSON.stringify({
            'city': fields.cityField.value
        }),
    }).then((res) => {
        location.reload();
    });
})

saveAddressBtn.addEventListener('click', () => {
    const errorMassage = document.querySelector('#edit_address_panel .error_message')
    errorMassage.style.display = 'none'
    const fields = {
        addressField: document.querySelector('#edit_address_panel #addressField'),
    }
    if (!isEmpty(fields)) {
        errorMassage.style.display = 'block';
        return
    }

    fetch(BASE_EDIT_URL, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('access'),
        },
        body: JSON.stringify({
            'address': fields.addressField.value
        }),
    }).then((res) => {
        location.reload();
    });
})

savePhoneNumber.addEventListener('click', () => {
    const errorMassage = document.querySelector('#edit_phone_number_panel .error_message')
    errorMassage.style.display = 'none'
    const fields = {
        phoneNumberField: document.querySelector('#edit_phone_number_panel #phoneNumberField'),
    }
    if (!isEmpty(fields)) {
        errorMassage.style.display = 'block';
        return
    }

    fetch(BASE_EDIT_URL, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('access'),
        },
        body: JSON.stringify({
            'phone_number': fields.phoneNumberField.value
        }),
    }).then((res) => {
        location.reload();
    });
})


// implement close button
const changeNamePanelCloseBnt = Array.from(
    document.querySelectorAll('.edit_panel i')
);

for (const closeBtn of changeNamePanelCloseBnt) {
    closeBtn.addEventListener('click', () => {
        closeBtn.parentNode.classList.remove('active');
        main.classList.remove('active');
    });
}


