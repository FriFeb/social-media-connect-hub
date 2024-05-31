document.addEventListener('DOMContentLoaded', () => {
  profileNav.classList.add('active', 'text-white');
});

function removeActiveLinks() {
  const navLinks = userNavigation.querySelectorAll('a');
  navLinks.forEach((navLink) => {
    navLink.classList.remove('active');
  });
}

function hideAdminTables() {
  const userPosts = userContent.querySelector('#userPosts');
  const userFriends = userContent.querySelector('#userFriends');
  const userComments = userContent.querySelector('#userComments');

  userPosts.classList.add('d-none');
  userFriends.classList.add('d-none');
  userComments.classList.add('d-none');
}

function showProperAdminTable(tableName) {
  document.querySelector(`#user${tableName}`).classList.remove('d-none');
}

userNavigation.addEventListener('click', (event) => {
  const navLink = event.target.closest('a');
  if (!navLink) return;

  removeActiveLinks();
  navLink.classList.add('active');

  hideAdminTables();
  showProperAdminTable(navLink.dataset.tableName);
});
