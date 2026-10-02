const form = document.querySelector("form");
const dialog = document.querySelector("dialog");

const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const email = document.querySelector("#email");
const queryType = document.querySelectorAll('input[name="query-type"]');
const message = document.querySelector("#message");
const consent = document.querySelector('#contact-consent');

const firstNameFeedback = document.querySelector(".first-name .feedback");
const lastNameFeedback = document.querySelector(".last-name .feedback");
const emailInvalidFeedback = document.querySelector(".email .invalid");
const emailEmptyFeedback = document.querySelector(".email .empty");
const queryTypeFeedback = document.querySelector("fieldset .feedback");
const messageFeedback = document.querySelector(".message .feedback");
const consentFeedback = document.querySelector(".contact-consent .feedback");

// First Name
firstName.addEventListener("input", (e) => {
    let value = e.target.value.trim();
    if (value === "" || value === null || !firstName.validity.valid) {
        return setInvalid(firstName, firstNameFeedback);
    }
    setValid(firstName, firstNameFeedback);
});

// Last Name
lastName.addEventListener("input", (e) => {
    let value = e.target.value.trim();
    if (value === "" || !lastName.validity.valid) {
        return setInvalid(lastName, lastNameFeedback);
    }
    setValid(lastName, lastNameFeedback);
});

// Email Address
email.addEventListener("input", (e) => {
    let value = e.target.value.trim();
    if (value === "" ||value === null) {
        emailInvalidFeedback.style.display = "none";
        setInvalid(email, emailEmptyFeedback);
        return;
    }

    emailEmptyFeedback.style.display = "none";
    
    if (!email.validity.valid) {
        return setInvalid(email, emailInvalidFeedback);
    }
    setValid(email, emailInvalidFeedback);
});

// Query Type
queryType.forEach((radio) => {
    radio.addEventListener("change", () => {
        setValid(radio, queryTypeFeedback);
    });
});

// Message
message.addEventListener("input", (e) => {
    let value = e.target.value.trim();
    if (value === "" ||value === null || !message.validity.valid) {
        return setInvalid(message, messageFeedback);
    }
    setValid(message, messageFeedback);
});

// Consent
consent.addEventListener("change", () => {
    if (!consent.checked) {
        return setInvalid(consent, consentFeedback);
    }
    setValid(consent, consentFeedback);
});


// FORM SUBMISSION
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    // First name
    if (!firstName.validity.valid) {
        setInvalid(firstName, firstNameFeedback);
        valid = false;
    }

    // Last name
    if (!lastName.validity.valid) {
        setInvalid(lastName, lastNameFeedback);
        valid = false;
    }

    // Email
    if (!email.validity.valid) {
        valid = false;

        if (email.value === "") {
            setInvalid(email, emailEmptyFeedback);
        } else {
            setInvalid(email, emailInvalidFeedback);
        }
    }

    // Query Type
    const queryTypeSelected = document.querySelector(
        'input[name="query-type"]:checked'
    );

    if (!queryTypeSelected) {
        queryTypeFeedback.style.display = "block";
        valid = false;
    }

    // Message
    if (!message.validity.valid) {
        setInvalid(message, messageFeedback);
        valid = false;
    }

    // Terms
    if (!consent.checked) {
        consentFeedback.style.display = "block";
        valid = false;
    }

    if (valid) {
        dialog.show();
        setTimeout(() => { dialog.close() }, 3000);
        form.reset();
    }
});

function setInvalid(formField, feedback) {
    feedback.style.display = "block";
    formField.style.borderColor = "hsl(0, 66%, 54%)";
    formField.setAttribute('aria-invalid', 'true');
}

function setValid(formField, feedback) {
    feedback.style.display = "none";
    formField.style.borderColor = "hsl(186, 15%, 59%)";
    formField.setAttribute('aria-invalid', 'false');
}