import { getRequest, postRequest } from './helpers.js';

function createUserElement(user) {
  return `<tr data-user-id=${user.user_id}>
    <td><img class="rounded-circle" src="/avatars/${user.avatar}" style="width:64px;"></td>
    <td>${user.first_name}</td>
    <td>${user.second_name}</td>
    <td>@${user.nickname}</td>
    <td>${user.biography}</td>
    <td>${user.email}</td>
    <td> 
      <nav class="nav flex-nowrap justify-content-center controls">
      <a class="nav-link" href="/user/${user.user_id}">
        <i class="fs-5 bi-eye"></i>
      </a>
      <button class="nav-link" data-bs-toggle="modal" data-bs-target="#userPanel" data-action="edit">
        <i class="fs-5 bi-pencil"></i>
      </button>
      <button class="nav-link" data-action="delete">
        <i class="fs-5 bi-trash"></i>
      </button>
      </nav>
    </td>
  </tr>`;
}

function createPostElement(post) {
  return `<tr data-post-id=${post.post_id}>
    <td>${post.author_id}</td>
    <td>${post.text}</td>
    <td><img src="/files/${post.attachment}" style="width:64px;"</td>
    <td>${post.likes_number}</td>
    <td>
        <nav class="nav flex-nowrap justify-content-center controls">
          <button class="nav-link" href="" data-bs-toggle="modal" data-bs-target="#postPanel" data-action="edit">
            <i class="fs-5 bi-pencil"></i>
          </button>
          <button class="nav-link" href="" data-action="delete">
            <i class="fs-5 bi-trash"></i>
          </button>
        </nav>
    </td>
  </tr>`;
}

function createFormElement(form) {
  return `<tr data-form-id=${form.form_id}>
    <td>${form.author_id}</td>
    <td>${form.subject}</td>
    <td>${form.text}</td>
    <td><img src="/files/${form.attachment}" style="width:64px;" /></td>
    <td>${String(new Date(Date.parse(form.creation_time))).split('GMT')[0]}</td>
    <td>
      <nav class="nav flex-nowrap justify-content-center controls">
        <button class="nav-link" href="" data-bs-toggle="modal" data-bs-target="#formPanel" data-action="edit">
          <i class="fs-5 bi-reply"></i>
        </button>
        <button class="nav-link" data-action="delete">
          <i class="fs-5 bi-trash"></i>
        </button>
      </nav>
    </td>
  </tr>`;
}

function createEntityElements(type, entities) {
  return entities.map((entity) => {
    switch (type) {
      case 'users':
        return createUserElement(entity);
      case 'posts':
        return createPostElement(entity);
      case 'forms':
        return createFormElement(entity);
    }
  });
}

async function renderData() {
  const [users, posts, forms] = await Promise.all([
    getRequest('http://localhost:3080/api/users'),
    getRequest('http://localhost:3080/api/posts'),
    getRequest('http://localhost:3080/api/forms'),
  ]);

  const userElements = createEntityElements('users', users);
  const postElements = createEntityElements('posts', posts);
  const formElements = createEntityElements('forms', forms);

  document.querySelector('#usersTable tbody').innerHTML = userElements.join('');
  document.querySelector('#userNumber').innerHTML = userElements.length;

  document.querySelector('#postsTable tbody').innerHTML = postElements.join('');
  document.querySelector('#postNumber').innerHTML = postElements.length;

  document.querySelector('#formsTable tbody').innerHTML = formElements.join('');
  document.querySelector('#formNumber').innerHTML = formElements.length;
}

document.addEventListener('DOMContentLoaded', renderData);

function removeActiveLinks() {
  const navLinks = adminNav.querySelectorAll('button');
  navLinks.forEach((navLink) => {
    navLink.classList.remove('active', 'text-white');
  });
}

function hideAdminTables() {
  const tables = adminTable.querySelectorAll('table');
  tables.forEach((table) => {
    table.classList.add('d-none');
  });
}

function showProperAdminTable(tableName) {
  document.querySelector(`#${tableName}Table`).classList.remove('d-none');
}

adminNav.addEventListener('click', (event) => {
  const navLink = event.target.closest('button');
  if (!navLink) return;

  removeActiveLinks();
  navLink.classList.add('active', 'text-white');

  hideAdminTables();
  showProperAdminTable(navLink.dataset.tableName);
});

usersTable.addEventListener('click', async (event) => {
  const target = event.target;

  if (target.closest('[data-action="edit"]')) {
    const userId = target.closest('tr').dataset.userId;
    const endpoint = `http://localhost:3080/api/users/${userId}`;

    const response = await fetch(endpoint);
    const user = await response.json();

    userInputUserId.value = userId;
    userImageAvatar.src = `/avatars/${user.avatar}`;
    userInputFirstName.value = user.first_name;
    userInputSecondName.value = user.second_name;
    userInputNickname.value = user.nickname;
    userInputBiography.value = user.biography;
    userInputEmail.value = user.email;
  }

  if (target.closest('[data-action="delete"]')) {
    const id = target.closest('tr').dataset.userId;
    await fetch(`http://localhost:3080/api/users/${id}/delete`, {
      method: 'POST',
    });
    renderData();
  }
});

userPanelForm.addEventListener('submit', (event) => {
  event.preventDefault();

  postRequest(`users/${userInputUserId.value}`, userPanelForm);
});

postsTable.addEventListener('click', async (event) => {
  const target = event.target;

  if (target.closest('[data-action="edit"]')) {
    const postId = target.closest('tr').dataset.postId;
    const endpoint = `http://localhost:3080/api/posts/${postId}`;

    const response = await fetch(endpoint);
    const post = await response.json();

    postInputPostId.value = postId;
    postImageAttachment.src = `/files/${post.attachment}`;
    postInputMessage.innerHTML = post.text;
    postInputLikes.value = post.likes_number;
  }

  if (target.closest('[data-action="delete"]')) {
    const id = target.closest('tr').dataset.postId;
    await fetch(`http://localhost:3080/api/posts/${id}/delete`, {
      method: 'POST',
    });
    renderData();
  }
});

postPanelForm.addEventListener('submit', (event) => {
  event.preventDefault();

  postRequest(`posts/${postInputPostId.value}/update`, postPanelForm);
});

formsTable.addEventListener('click', async (event) => {
  const target = event.target;

  if (target.closest('[data-action="edit"]')) {
    const formId = target.closest('tr').dataset.formId;
    const endpoint = `http://localhost:3080/api/forms/${formId}`;

    const response = await fetch(endpoint);
    const form = await response.json();

    formInputFormId.value = formId;
    formImageAttachment.src = `/files/${form.attachment}`;
    formSubject.value = form.subject;
    formMessage.value = form.text;
  }

  if (target.closest('[data-action="delete"]')) {
    const id = target.closest('tr').dataset.formId;
    await fetch(`http://localhost:3080/api/forms/${id}/delete`, {
      method: 'POST',
    });
    renderData();
  }
});

formPanelForm.addEventListener('submit', (event) => {
  event.preventDefault();
});

const adminPanelModalsTogglers = document.querySelectorAll(
  '[data-bs-target="#adminPanel"]'
);

for (let modal of adminPanelModalsTogglers) {
  modal.addEventListener('click', renderData);
}

const toastBootstrap = bootstrap.Toast.getOrCreateInstance(liveToast);
const toastTriggers = document.querySelectorAll('.toastTrigger');
for (let toastTrigger of toastTriggers) {
  toastTrigger.addEventListener('click', () => {
    toastBootstrap.show();
  });
}
