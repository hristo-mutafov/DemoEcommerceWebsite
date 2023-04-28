const validateForm = (e) => {
    e.preventDefault();
    // Validate for empty fields
    let valid = true;
    if (register_btn) {
        for (const field of Object.values(registerFields)) {
            if (!field.value) {
                valid = false;
            }
        }
        // Validate if the passwords are the same
        if (passwordField.value !== repeatPasswordField.value) {
            errorMessages.classList.toggle('active');
            return;
        }
    } else {
        for (const field of Object.values(loginFields)) {
            if (!field.value) {
                valid = false;
            }
        }
    }

    if (valid && register_btn) {
        authenticate('http://127.0.0.1:8000/register/');
    } else if (valid) {
        authenticate('http://127.0.0.1:8000/login/');
    } else {
        for (const input of inputFields) {
            input.classList.toggle('active');
        }
    }
};

const authenticate = async (URL) => {
    console.log(URL);
    // const requestBody = getRequestBody();
    // console.log(requestBody);
    // const fRes = await fetch(REGISTER, {
    //     method: 'POST',
    // });
};

const getRequestBody = () => {
    const requestBody = JSON.stringify({
        email: emailField.value,
        password: passwordField.value,
    });
    return requestBody;
};

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

const register_btn = document.getElementById('register_btn');
const login_btn = document.getElementById('login_btn');

if (register_btn) {
    register_btn.addEventListener('click', validateForm);
}

if (login_btn) {
    login_btn.addEventListener('click', validateForm);
}
