const form = document.getElementById('reg-form');
const submitBtn = document.querySelector('button[type=submit]');
const firstName = document.getElementById('first-name');
const secondName = document.getElementById('second-name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const pass = document.getElementById('pass');
const confirmPass = document.getElementById('confirm-pass');
const passEye = document.querySelector('.pass-eye');
const confirmPassEye = document.querySelector('.confirm-pass-eye');
const passHelp = document.querySelector('.pass-help');
const passTooltip = document.querySelector('.pass-tooltip');
let timer;

function showNameErrorMsg(event) {
  const nameInput = event.target;
  const validityState = nameInput.validity;
  const nameInputError = event.target.nextElementSibling;
  console.log(nameInputError);

  nameInput.classList.remove('error');
  nameInputError.textContent = '';

  if (validityState.valueMissing) {
    nameInput.classList.add('error');
    nameInputError.textContent = '* Please fill out this field!';
  }

  if (validityState.patternMismatch) {
    nameInput.classList.add('error');
    nameInputError.textContent = '* Should start with a capital letter!';
  }

  if (validityState.tooShort) {
    nameInput.classList.add('error');
    nameInputError.textContent = '* Name is too short!';
  }
}

function showEmailErrorMsg() {
  const validityState = email.validity;
  const emailError = email.nextElementSibling;

  email.classList.remove('error');
  emailError.textContent = '';

  if (validityState.valueMissing) {
    email.classList.add('error');
    emailError.textContent = '* Please fill out this field!';
  }

  if (validityState.typeMismatch) {
    email.classList.add('error');
    emailError.textContent = '* Should be an email!';
  }

  if (validityState.tooShort) {
    email.classList.add('error');
    emailError.textContent = '* Email is too short!';
  }
}

function showPhoneErrorMsg() {
  const validityState = phone.validity;
  const phoneError = phone.nextElementSibling;

  phone.classList.remove('error');
  phoneError.textContent = '';

  console.log(phone.validity);
  const pattern = /\d{11}/;
  pattern.test(phone.value);

  if (validityState.valueMissing) {
    phone.classList.add('error');
    phoneError.textContent = '* Please fill out this field!';
  }

  if (validityState.patternMismatch) {
    phone.classList.add('error');
    phoneError.textContent = '* Should contain only numbers!';
  }

  if (validityState.tooShort) {
    phone.classList.add('error');
    phoneError.textContent = '* Phone is too short!';
  }
}

function updateTooltipState(...errors) {
  const passTooltipImgs = passTooltip.querySelectorAll('img');

  errors.forEach((error, index) => {
    if (error) {
      passTooltipImgs[index].src = '/images/red_cross.png';
    } else {
      passTooltipImgs[index].src = '/images/green_check.png';
    }
  });
}

function showPassErrorMsg() {
  const passValue = pass.value;
  const validityState = pass.validity;
  const passError = pass.parentElement.parentElement.lastElementChild;

  const capitalLetterRegExp = /(?=.*[A-Z])./;
  const letterRegExp = /^(?=.*[a-z])/;
  const digitRegExp = /^(?=.*\d)/;

  const capitalError = !capitalLetterRegExp.test(passValue);
  const letterError = !letterRegExp.test(passValue);
  const digitError = !digitRegExp.test(passValue);
  const lengthError = validityState.tooShort;

  pass.classList.remove('error');
  passError.textContent = '';

  if (validityState.valueMissing) {
    pass.classList.add('error');
    passError.textContent = '* Please fill out this field!';
  }

  if (validityState.patternMismatch) {
    pass.classList.add('error');

    if (capitalError) {
      passError.textContent = '* Should contain at least one capital letter!';
    }
    if (letterError) {
      passError.textContent = '* Should contain at least one letter!';
    }
    if (digitError) {
      passError.textContent = '* Should contain at least one digit!';
    }
  }

  if (lengthError) {
    pass.classList.add('error');
    passError.textContent = '* Password is too short!';
  }

  updateTooltipState(capitalError, letterError, digitError, lengthError);
}

function showConfirmPassErrorMsg() {
  const confirmPassError =
    confirmPass.parentElement.parentElement.lastElementChild;

  confirmPass.classList.remove('error');
  confirmPassError.textContent = '';

  if (confirmPass.validity.valueMissing) {
    confirmPass.classList.add('error');
    confirmPassError.textContent = '* Please fill out this field!';
  }

  if (confirmPass.value !== pass.value) {
    confirmPass.classList.add('error');
    confirmPassError.textContent = '* Passwords should match!';
  }
}

function togglePasswordVisibility(eye, element) {
  if (element.type === 'password') {
    eye.src = '/images/closed_eye.png';
    element.type = 'text';
  } else {
    eye.src = '/images/eye.png';
    element.type = 'password';
  }
}

function centerTooltip(targetCoords, tooltipCoords) {
  // Cant set coords with .css because of parent container
  const top = targetCoords.top - tooltipCoords.height - 25;
  const left =
    targetCoords.left - (tooltipCoords.width - targetCoords.width) / 2;
  passTooltip.style.top = top + 'px';
  passTooltip.style.left = left + 'px';
}

function showTooltip(event) {
  passTooltip.hidden = false;

  centerTooltip(
    event.target.getBoundingClientRect(),
    passTooltip.getBoundingClientRect()
  );
}

function delayTooltip(event) {
  timer = setTimeout(() => {
    showTooltip(event);
  }, 300);
}

firstName.addEventListener('change', showNameErrorMsg);
secondName.addEventListener('change', showNameErrorMsg);
email.addEventListener('change', showEmailErrorMsg);
phone.addEventListener('change', showPhoneErrorMsg);
pass.addEventListener('change', showPassErrorMsg);
confirmPass.addEventListener('change', showConfirmPassErrorMsg);
passEye.addEventListener('click', () => {
  togglePasswordVisibility(passEye, pass);
});
confirmPassEye.addEventListener('click', () => {
  togglePasswordVisibility(confirmPassEye, confirmPass);
});
passHelp.addEventListener('mouseover', delayTooltip);
passHelp.addEventListener('mouseout', () => {
  passTooltip.hidden = true;
  clearTimeout(timer);
});
