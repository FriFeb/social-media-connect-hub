import { makeRequest } from './helpers.js';

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
      <a class="nav-link" href="" data-bs-toggle="modal" data-bs-target="#userPanel" data-action="edit">
        <i class="fs-5 bi-pencil"></i>
      </a>
      <a class="nav-link" href="" data-action="view">
        <i class="fs-5 bi-trash"></i>
      </a>
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
          <a class="nav-link" href="" data-bs-toggle="modal" data-bs-target="#postPanel" data-action="edit">
            <i class="fs-5 bi-pencil"></i>
          </a>
          <a class="nav-link" href="" data-action="delete">
            <i class="fs-5 bi-trash"></i>
          </a>
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
    <td>${form.creation_time}</td>
    <td>
      <nav class="nav flex-nowrap justify-content-center controls">
        <a class="nav-link" href="" data-bs-toggle="modal" data-bs-target="#formPanel" data-action="edit">
          <i class="fs-5 bi-eye"></i>
        </a>
        <a class="nav-link" href="" data-action="delete">
          <i class="fs-5 bi-trash"></i>
        </a>
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

document.addEventListener('DOMContentLoaded', async () => {
  const [users, posts, forms] = await Promise.all([
    makeRequest('http://localhost:3080/api/users'),
    makeRequest('http://localhost:3080/api/posts'),
    makeRequest('http://localhost:3080/api/forms'),
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
});

function removeActiveLinks() {
  const navLinks = adminNav.querySelectorAll('a');
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
  const navLink = event.target.closest('a');
  if (!navLink) return;

  removeActiveLinks();
  navLink.classList.add('active', 'text-white');

  hideAdminTables();
  showProperAdminTable(navLink.dataset.tableName);
});

usersTable.addEventListener('click', async (event) => {
  const target = event.target;

  if (!target.closest('.controls')) return;

  if (target.closest('[data-action="edit"]')) {
    const userId = target.closest('tr').dataset.userId;
    const endpoint = `http://localhost:3080/api/users/${userId}`;

    const response = await fetch(endpoint);
    const user = await response.json();

    userPanelForm.action = endpoint;
    imageAvatar.src = `/avatars/${user.avatar}`;
    userInputFirstName.value = user.first_name;
    userInputSecondName.value = user.second_name;
    userInputNickname.value = user.nickname;
    userInputBiography.value = user.biography;
    userInputEmail.value = user.email;
  }

  if (target.closest('[data-action="delete"]')) {
  }
});
