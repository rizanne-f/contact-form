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
    if (value === "") return firstNameFeedback.style.display = "block";

    firstNameFeedback.style.display = firstName.validity.valid ? "none" : "block";
});

// Last Name
lastName.addEventListener("input", (e) => {
    let value = e.target.value.trim();
    if (value === "") return lastNameFeedback.style.display = "block";

    lastNameFeedback.style.display = lastName.validity.valid ? "none" : "block";
});

// Email Address
email.addEventListener("input", (e) => {
    let value = e.target.value.trim();
    if (value === null) {
        emailInvalidFeedback.style.display = "none";
        emailEmptyFeedback.style.display =
        email.validity.valid ? "none" : "block";
        return;
    }

    emailEmptyFeedback.style.display = "none";
    emailInvalidFeedback.style.display = email.validity.valid ? "none" : "block";
});

// Query Type
queryType.forEach((radio) => {
    radio.addEventListener("change", () => {
        queryTypeFeedback.style.display = "none";
    });
});

// Message
message.addEventListener("input", (e) => {
    let value = e.target.value.trim();
    if (value === "") return messageFeedback.style.display = "block";

    messageFeedback.style.display = message.validity.valid ? "none" : "block";
});

// Consent
consent.addEventListener("change", () => {
    consentFeedback.style.display = consent.checked ? "none" : "block";
});


// FORM SUBMISSION
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    // First name
    if (!firstName.validity.valid) {
        firstNameFeedback.style.display = "block";
        valid = false;
    }

    // Last name
    if (!lastName.validity.valid) {
        lastNameFeedback.style.display = "block";
        valid = false;
    }

    // Email
    if (!email.validity.valid) {
        valid = false;
        if (email.value === "") {
            emailEmptyFeedback.style.display = "block";
        } else {
            emailFeedback.style.display = "block";
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
        messageFeedback.style.display = "block";
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