function checkFormValidity(event) {
  if (!loginForm.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
  }

  loginForm.classList.add('was-validated');
}

function showLoginErrorMessage() {
  const validityState = inputLogin.validity;
  const parentElement = inputLogin.parentElement;
  const invalidFeedbackElement = inputLogin.parentElement.lastElementChild;

  parentElement.classList.add('was-validated');
  invalidFeedbackElement.textContent = '';

  if (validityState.valueMissing) {
    invalidFeedbackElement.textContent = '* Please fill out this field!';
  }

  if (validityState.tooShort) {
    invalidFeedbackElement.textContent = '* Login is too short!';
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

loginForm.addEventListener('submit', checkFormValidity);
inputLogin.addEventListener('change', showLoginErrorMessage);
inputPassword.addEventListener('change', showPasswordErrorMessage);
