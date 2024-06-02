import { postRequest } from './helpers.js';

document.addEventListener('DOMContentLoaded', () => {
  chatsNav.classList.add('active', 'text-white');
});

let currentChat;

function removeActiveChats() {
  const chatElements = chats.querySelectorAll('button');
  chatElements.forEach((chatElement) => {
    chatElement.classList.remove('active', 'text-white');
  });
}

chats.addEventListener('click', (event) => {
  const target = event.target;
  const btnElement = target.closest('button');

  if (!btnElement) return;

  const currentChatId = btnElement.dataset.chatId;

  // hide all - show current
  removeActiveChats();
  btnElement.classList.add('active', 'text-white');

  // hide previous - show current
  if (currentChat) currentChat.classList.add('d-none');

  // show current chat
  currentChat = messages.querySelector(`[data-chat-id="${currentChatId}"]`);
  currentChat.classList.remove('d-none');

  // append chatid to the form
  inputChat.value = currentChat.dataset.chatId;

  // show the form
  chatForm.classList.remove('d-none');

  // scroll chat to bottom
  messages.scrollTop = currentChat.scrollHeight;
});

function createMessageElement(text) {
  return `
  <div class="row justify-content-end py-2 text-white message">
    <div class="col-10 col-md-8">
      <div class="row justify-content-end">
        <div class="col-auto">
          <div class="rounded p-3 bg-primary">${text}</div>
        </div>
      </div>
    </div>
  </div>`;
}

function addFileSection(lastMessageElement) {
  lastMessageElement.innerHTML += `
  <div class="w-100"></div>
    <div class="col-10 col-md-4 pt-2">
      <img class="img-fluid" src="">
    </div>
  `;
}

function addFile(lastMessageElement, file) {
  const img = lastMessageElement.querySelector('img');

  const reader = new FileReader();

  reader.onload = function (event) {
    img.src = event.target.result;
  };

  reader.readAsDataURL(file);
}

function showFileElement() {
  const messageElements = messages.querySelectorAll('.message');
  const lastMessageElement = messageElements[messageElements.length - 1];

  const inputFile = chatForm.file.files[0];

  if (inputFile) {
    addFileSection(lastMessageElement);
    addFile(lastMessageElement, inputFile);
  }
}

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();

  postRequest('messages', chatForm);

  const message = createMessageElement(chatForm.text.value);
  currentChat.innerHTML += message;

  showFileElement();

  chatForm.reset();

  inputChat.value = currentChat.dataset.chatId;
});
