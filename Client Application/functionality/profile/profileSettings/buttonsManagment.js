import isEmpty from "../../modules/formIsEmpty.mjs";
import parseJwt from "../../modules/getUserId.mjs";
import checkPassword from "../../modules/checkPassword.mjs";

const userId = parseJwt(localStorage.getItem("access")).user_id;
const EDIT_URL = `http://127.0.0.1:8000/user/${userId}`;

const editNameBnt = document.getElementById("edit_name_btn");
const editEmailBtn = document.getElementById("edit_email_btn");
const changePasswordBtn = document.getElementById("change_password_btn");
const deleteProfileBtn = document.querySelector(
    ".profile_settings .profile_delete #deleteBtn"
);

const main = document.getElementById("main");
const changeNamePanel = document.getElementById("change_name_panel");
const changeEmailPanel = document.getElementById("change_email_panel");
const changePasswordPanel = document.getElementById("change_password_panel");
const deleteProfilePanel = document.getElementById("delete_profile_panel");
// Add event listeners

editNameBnt.addEventListener("click", () => {
    changeNamePanel.classList.add("active");
    main.classList.add("active");
});

editEmailBtn.addEventListener("click", () => {
    changeEmailPanel.classList.add("active");
    main.classList.add("active");
});

changePasswordBtn.addEventListener("click", () => {
    changePasswordPanel.classList.add("active");
    main.classList.add("active");
});

deleteProfileBtn.addEventListener("click", () => {
    deleteProfilePanel.classList.add("active");
    main.classList.add("active");
});

// Implement close buttons
const changeNamePanelCloseBnt = Array.from(
    document.querySelectorAll(".edit_panel i")
);

for (const closeBtn of changeNamePanelCloseBnt) {
    closeBtn.addEventListener("click", () => {
        closeBtn.parentNode.classList.remove("active");
        main.classList.remove("active");
    });
}

// Implement Fetch requests

const saveNamesBtn = document.querySelector("#change_name_panel #saveName");
const saveEmailBtn = document.querySelector("#change_email_panel #saveEmail");
const savePasswordBtn = document.querySelector(
    "#change_password_panel #savePassword"
);
const innerDeleteProfileBtn = document.querySelector(
    "#delete_profile_panel #deleteProfileBtn"
);

// Set Event Listeners
saveNamesBtn.addEventListener("click", saveNewName);
saveEmailBtn.addEventListener("click", saveNewEmail);
savePasswordBtn.addEventListener("click", savePassword);
innerDeleteProfileBtn.addEventListener("click", deleteProfile);

function saveNewName() {
    const errorField = document.querySelector(
        "#change_name_panel .error_message"
    );

    const namesFields = {
        firstName: document.querySelector("#change_name_panel #first_name"),
        lastName: document.querySelector("#change_name_panel #last_name"),
    };

    if (!isEmpty(namesFields)) {
        errorField.textContent = "Fill the fields";
        errorField.style.display = "block";
        return;
    }

    fetch(EDIT_URL, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access"),
        },
        body: JSON.stringify({
            first_name: namesFields.firstName.value,
            last_name: namesFields.lastName.value,
        }),
    }).then((res) => {
        location.reload();
    });
}

async function saveNewEmail() {
    const errorMessage = document.querySelector(
        "#change_email_panel .error_message"
    );

    const inputFields = {
        password: document.querySelector("#change_email_panel #passwordInput"),
        email: document.querySelector("#change_email_panel #emailInput"),
    };

    if (!isEmpty(inputFields)) {
        console.log("here");
        errorMessage.textContent = "Fill the fields";
        errorMessage.style.display = "block";
        return;
    }
    if (!(await checkPassword(inputFields.password.value, userId))) {
        errorMessage.textContent = "Wrong Password";
        errorMessage.style.display = "block";
        return;
    }
    fetch(EDIT_URL, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access"),
        },
        body: JSON.stringify({
            email: inputFields.email.value,
        }),
    }).then((res) => {
        location.reload();
    });
}

async function savePassword() {
    const errorField = document.querySelector(
        "#change_password_panel .error_message"
    );
    errorField.textContent = "";
    const inputFields = {
        oldPass: document.querySelector(
            "#change_password_panel #oldPasswordInput"
        ),
        newPass: document.querySelector(
            "#change_password_panel #newPasswordInput"
        ),
        repeatPass: document.querySelector(
            "#change_password_panel #repetPasswordInput"
        ),
    };

    if (!isEmpty(inputFields)) {
        errorField.textContent = "Fill the fields";
        errorField.style.display = "block";
        return;
    } else if (!(await checkPassword(inputFields.oldPass.value, userId))) {
        errorField.textContent = "Incorrect Old Password";
        errorField.style.display = "block";
        return;
    } else if (inputFields.newPass.value !== inputFields.repeatPass.value) {
        errorField.textContent = "The new passwords are not the same";
        errorField.style.display = "block";
        return;
    }

    fetch(EDIT_URL, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access"),
        },
        body: JSON.stringify({
            password: inputFields.newPass.value,
        }),
    }).then((res) => {
        location.reload();
    });
}

function deleteProfile() {
    fetch(EDIT_URL, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access"),
        },
    }).then((res) => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        location.href = "/";
    });
}
