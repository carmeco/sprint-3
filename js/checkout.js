// Get the input fields
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');
const password = document.querySelector("#password");
const address = document.querySelector('#address');
const phone = document.querySelector('#phone');
const allInputs = document.querySelectorAll('input');

//Get error messages
const errorFirstName = document.querySelector('#errorFirstName');
const errorLastName = document.querySelector('#errorLastName');
const errorEmail = document.querySelector('#errorEmail');
const errorPassword = document.querySelector('#errorPassword');
const errorAddress = document.querySelector('#errorAddress');
const errorPhone = document.querySelector('#errorPhone');
const allErrors = document.querySelectorAll('.errorMessage');

//Regular Expressions
const notAllChars = /[^aA-zZ]/;
const notAllNums = /[^0-9]/;
const charsAndNums = /[aA-zZ]+[0-9]/;
const validEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;


// Exercise 8
function validate(event) {

    event.preventDefault();

    //Remove previous states
    allInputs.forEach((input) => {
        input.classList.remove('invalid');
    });
    allErrors.forEach((error) => {
        error.innerHTML = '';
    });

    //Name and surname validation
    if (firstName.value.length < 3) {
        errorFirstName.innerHTML = "Required. At least 3 characters.";
        firstName.classList.add('invalid');
    } else if (notAllChars.test(firstName.value)){ 
        errorFirstName.innerHTML = "Only alphabetic characters.";
        firstName.classList.add('invalid');
    }
    if (lastName.value.length < 3) {
        errorLastName.innerHTML = "Required. At least 3 characters.";
        lastName.classList.add('invalid');
    } else if (notAllChars.test(lastName.value)) {
        errorLastName.innerHTML = "Only alphabetic characters.";
        lastName.classList.add('invalid');
    }

    //Email validation
    if (email.value.length < 3) {
        errorEmail.innerHTML = "Required. At least 3 characters.";
        email.classList.add('invalid');
    } else if (!validEmail.test(email.value)) {
        errorEmail.innerHTML = "Invalid email address.";
        email.classList.add('invalid');

    }

    //Password validation
    if (password.value.length < 4) {
        errorPassword.innerHTML = "Required. Between 4 and 8 characters.";
        password.classList.add('invalid');
    } else if (!charsAndNums.test(password.value)) {
        errorPassword.innerHTML = "At least one alphabetic and one numeric character.";
        password.classList.add('invalid');
    }

    //Address validation
    if (address.value.length < 3) {
        errorAddress.innerHTML = "Required. At least 3 characters.";
        address.classList.add('invalid');
    }

    //Phone validation
    if (phone.value.length < 3) {
        errorPhone.innerHTML = "Required. At least 3 characters.";
        phone.classList.add('invalid');
    } else if (notAllNums.test(phone.value)) {
        errorPhone.innerHTML = "Only numeric characters.";
        phone.classList.add('invalid');
    }
}


