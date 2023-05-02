
const validateForm = (e) => {
    e.preventDefault();
    // Remove previous errors
    removeErrors();
    // Validate for empty fields
    if (register_btn) {
        for (const field of Object.values(registerFields)) {
            if (!field.value) {
                errorMessages.textContent = 'Please fill the fields';
                errorMessages.classList.toggle('active');
                inputFields.forEach((field) =>
                    field.classList.toggle('active')
                );
                return;
            }
        }
        // Validate if the passwords are the same
        if (passwordField.value !== repeatPasswordField.value) {
            errorMessages.textContent = 'The passwords are different';
            errorMessages.classList.toggle('active');
            passwordFields.forEach((field) => field.classList.toggle('active'));
            return;
        }
    } else {
        for (const field of Object.values(loginFields)) {
            if (!field.value) {
                errorMessages.textContent = 'Please fill the fields';
                errorMessages.classList.toggle('active');
                inputFields.forEach((field) =>
                    field.classList.toggle('active')
                );
                return;
            }
        }
    }

    if (register_btn) {
        authenticate('http://127.0.0.1:8000/register/');
    } else {
        authenticate('http://127.0.0.1:8000/login/');
    }
};

const authenticate = async (URL) => {
    const requestBody = getRequestBody();

    const fRes = await fetch(URL, {
        method: 'POST',
        body: requestBody,
        headers: { 'Content-Type': 'application/json' },
    });
    // Check if the user already have an acount (register)
    if (fRes.status === 400) {
        console.log(fRes.status);
        errorMessages.textContent = 'User with this email already exists';
        errorMessages.classList.toggle('active');
        return;
    }
    // Check if user exist (login)
    if (fRes.status === 404) {
        errorMessages.textContent = 'Wrong credentials';
        errorMessages.classList.toggle('active');
        return;
    }

    const jsonResult = await fRes.json();

    localStorage.setItem('refresh', jsonResult['refresh_token']);
    localStorage.setItem('access', jsonResult['access_token']);

    window.location.href = '/';
};

const getRequestBody = () => {
    const requestBody = JSON.stringify({
        email: emailField.value,
        password: passwordField.value,
    });
    return requestBody;
};

const removeErrors = () => {
    errorMessages.classList.remove('active');
    inputFields.forEach((field) => field.classList.remove('active'));
};

const TOKEN_URL = 'http://127.0.0.1:8000/token/refresh/';

const emailField = document.getElementById('email_field');
const passwordField = document.getElementById('password_field');
const repeatPasswordField = document.getElementById('repeat_password_field');

const registerFields = {
    emailField,
    passwordField,
    repeatPasswordField,
};
const loginFields = {
    emailField,
    passwordField,
};

const errorMessages = document.getElementById('error_messages');
const inputFields = Array.from(
    document.querySelectorAll('.authentication .form input')
);
const passwordFields = inputFields.slice(1);


const register_btn = document.getElementById('register_btn');
const login_btn = document.getElementById('login_btn');


if (register_btn) {
    register_btn.addEventListener('click', validateForm);
}

if (login_btn) {
    login_btn.addEventListener('click', validateForm);
}
