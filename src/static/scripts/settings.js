document.addEventListener('DOMContentLoaded', () => {
  settingsNav.classList.add('active', 'text-white');
});

function checkFormValidity(event) {
  if (!settingsForm.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
  }

  settingsForm.classList.add('was-validated');
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

settingsForm.addEventListener('submit', checkFormValidity);
inputFirstName.addEventListener('change', showNameErrorMessage);
inputSecondName.addEventListener('change', showNameErrorMessage);
inputNickname.addEventListener('change', showNicknameErrorMessage);
inputEmail.addEventListener('change', showEmailErrorMessage);
