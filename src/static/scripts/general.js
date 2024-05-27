function createUserElement(user) {
  return `<tr>
    <th scope="row">${user.user_id}</th>
    <td><img class="rounded-circle" src="/avatars/${user.avatar}" style="width:64px;"></td>
    <td>${user.first_name}</td>
    <td>${user.second_name}</td>
    <td>@${user.nickname}</td>
    <td>${user.biography}</td>
    <td>${user.email}</td>
    <td> 
      <nav class="nav flex-nowrap justify-content-center">
      <a class="nav-link" href="/users/${user.user_id}">
        <i class="fs-5 bi-eye"></i>
      </a>
      <a class="nav-link" href="" data-bs-toggle="modal" data-bs-target="#userPanel">
        <i class="fs-5 bi-pencil"></i>
      </a>
      <a class="nav-link" href="">
        <i class="fs-5 bi-trash"></i>
      </a>
      </nav>
    </td>
  </tr>`;
}

function createPostElement(post) {
  return `<tr>
    <th scope="row">${post.post_id}</th>
    <td>${post.user_id}</td>
    <td>${post.text}</td>
    <td><img src="/files/${post.attachment}" style="width:64px;"</td>
    <td>${post.likes}</td>
    <td>${post.comments}</td>
    <td>
        <nav class="nav flex-nowrap justify-content-center">
          <a class="nav-link" href="" data-bs-toggle="modal" data-bs-target="#postPanel">
            <i class="fs-5 bi-pencil"></i>
          </a>
          <a class="nav-link" href="">
            <i class="fs-5 bi-trash"></i>
          </a>
        </nav>
    </td>
  </tr>`;
}

function createFormElement(form) {
  return `<tr>
    <th scope="row">${form.form_id}</th>
    <td>${form.user_id}</td>
    <td>${form.subject}</td>
    <td>${form.text}</td>
    <td><img src="/files/${form.attachment}" style="width:64px;" /></td>
    <td>${form.creation_time}</td>
    <td>
      <nav class="nav flex-nowrap justify-content-center">
        <a class="nav-link" href="" data-bs-toggle="modal" data-bs-target="#formPanel">
          <i class="fs-5 bi-eye"></i>
        </a>
        <a class="nav-link" href="">
          <i class="fs-5 bi-trash"></i>
        </a>
      </nav>
    </td>
  </tr>`;
}

function createEntityElements(type, entities) {
  const entityElements = entities.map((entity) => {
    switch (type) {
      case 'users':
        return createUserElement(entity);
      case 'posts':
        return createPostElement(entity);
      case 'forms':
        return createFormElement(entity);
    }
  });

  return entityElements;
}

async function makeRequest(url) {
  const response = await fetch(url);
  const result = await response.json();

  return result;
}

document.addEventListener('DOMContentLoaded', async () => {
  const users = await makeRequest('http://localhost:3080/api/users');
  const posts = await makeRequest('http://localhost:3080/api/posts');
  // const forms = wait makeRequest('http://localhost:3080/api/forms');

  const userElements = createEntityElements('users', users);
  const postElements = createEntityElements('posts', posts);
  // const formElements = createEntityElements('forms', forms);

  document.querySelector('#usersTable tbody').innerHTML = userElements.join('');
  document.querySelector('#userNumber').innerHTML = userElements.length;

  document.querySelector('#postsTable tbody').innerHTML = postElements.join('');
  document.querySelector('#postNumber').innerHTML = postElements.length;

  // document.querySelector('#formsTable tbody').innerHTML = formElements.join('');
  // document.querySelector('#formNumber').innerHTML = formElements.length;
});

function removeActiveLinks() {
  navLinks = adminNav.querySelectorAll('a');
  navLinks.forEach((navLink) => {
    navLink.classList.remove('active', 'text-white');
  });
}

function hideAdminTables() {
  tables = adminTable.querySelectorAll('table');
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
