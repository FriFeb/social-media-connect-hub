function checkFormValidity(event) {
  if (!signupForm.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
  }

  signupForm.classList.add('was-validated');
}

function showNameErrorMessage(event) {
  const nameInput = event.target;
  const validityState = nameInput.validity;
  const parentElement = nameInput.parentElement;
  const invalidFeedbackElement = nameInput.parentElement.lastElementChild;

  parentElement.classList.add('was-validated');
  invalidFeedbackElement.textContent = '';

  if (validityState.valueMissing) {
    invalidFeedbackElement.textContent = '* Please fill out this field!';
  }

  if (validityState.patternMismatch) {
    invalidFeedbackElement.textContent =
      '* Should start with a capital letter!';
  }

  if (validityState.tooShort) {
    invalidFeedbackElement.textContent = '* Name is too short!';
  }
}

function showNicknameErrorMessage() {
  const validityState = inputNickname.validity;
  const parentElement = inputNickname.parentElement;
  const invalidFeedbackElement = inputNickname.parentElement.lastElementChild;

  parentElement.classList.add('was-validated');
  invalidFeedbackElement.textContent = '';

  if (validityState.valueMissing) {
    invalidFeedbackElement.textContent = '* Please fill out this field!';
  }

  if (validityState.tooShort) {
    invalidFeedbackElement.textContent = '* Nickname is too short!';
  }
}

function showEmailErrorMessage() {
  const validityState = inputEmail.validity;
  const parentElement = inputEmail.parentElement;
  const invalidFeedbackElement = inputEmail.parentElement.lastElementChild;

  parentElement.classList.add('was-validated');
  invalidFeedbackElement.textContent = '';

  if (validityState.valueMissing) {
    invalidFeedbackElement.textContent = '* Please fill out this field!';
  }

  if (validityState.typeMismatch) {
    invalidFeedbackElement.textContent = '* Should be an email!';
  }

  if (validityState.tooShort) {
    invalidFeedbackElement.textContent = '* Email is too short!';
  }
}

function showPasswordErrorMessage() {
  const validityState = inputPassword.validity;
  const parentElement = inputPassword.parentElement;
  const invalidFeedbackElement = inputPassword.parentElement.lastElementChild;

  const passValue = inputPassword.value;

  const capitalLetterRegExp = /(?=.*[A-Z])./;
  const letterRegExp = /^(?=.*[a-z])/;
  const digitRegExp = /^(?=.*\d)/;

  const capitalError = !capitalLetterRegExp.test(passValue);
  const letterError = !letterRegExp.test(passValue);
  const digitError = !digitRegExp.test(passValue);
  const lengthError = validityState.tooShort;

  parentElement.classList.add('was-validated');
  invalidFeedbackElement.textContent = '';

  if (validityState.valueMissing) {
    invalidFeedbackElement.textContent = '* Please fill out this field!';
  }

  if (validityState.patternMismatch) {
    if (capitalError) {
      invalidFeedbackElement.textContent =
        '* Should contain at least one capital letter!';
    }
    if (letterError) {
      invalidFeedbackElement.textContent =
        '* Should contain at least one small letter!';
    }
    if (digitError) {
      invalidFeedbackElement.textContent =
        '* Should contain at least one digit!';
    }
  }

  if (lengthError) {
    invalidFeedbackElement.textContent = '* Password is too short!';
  }
}

function showPasswordConfirmErrorMessage() {
  const validityState = inputPasswordConfirm.validity;
  const parentElement = inputPasswordConfirm.parentElement;
  const invalidFeedbackElement =
    inputPasswordConfirm.parentElement.lastElementChild;

  parentElement.classList.add('was-validated');
  invalidFeedbackElement.textContent = '';

  if (validityState.valueMissing) {
    invalidFeedbackElement.textContent = '* Please fill out this field!';
  }

  if (validityState.tooShort) {
    invalidFeedbackElement.textContent = '* Password is too short!';
  }

  if (inputPasswordConfirm.value !== inputPassword.value) {
    inputPasswordConfirm.style.cssText = `
    border-color: var(--bs-form-invalid-border-color);
    padding-right: calc(1.5em + .75rem);
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right calc(.375em + .1875rem) center;
    background-size: calc(.75em + .375rem) calc(.75em + .375rem);
    `;

    invalidFeedbackElement.textContent = '* Passwords should match!';
    invalidFeedbackElement.style.display = 'block';
  }
}

signupForm.addEventListener('submit', checkFormValidity);
inputFirstName.addEventListener('change', showNameErrorMessage);
inputSecondName.addEventListener('change', showNameErrorMessage);
inputNickname.addEventListener('change', showNicknameErrorMessage);
inputEmail.addEventListener('change', showEmailErrorMessage);
inputPassword.addEventListener('change', showPasswordErrorMessage);
inputPasswordConfirm.addEventListener(
  'change',
  showPasswordConfirmErrorMessage
);
