import { postRequest } from './helpers.js';

document.addEventListener('DOMContentLoaded', () => {
  contactNav.classList.add('active', 'text-white');
});

if (toastTrigger) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(liveToast);
  toastTrigger.addEventListener('click', () => {
    toastBootstrap.show();
  });
}

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  postRequest('forms', contactForm);
  contactForm.reset();
});
