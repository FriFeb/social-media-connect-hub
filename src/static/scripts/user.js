import { postRequest } from './helpers.js';

document.addEventListener('DOMContentLoaded', () => {
  const currentUserId = document.cookie.match(new RegExp(/(?<==).*/))[0];
  const userId = document.URL.match(new RegExp(/(?<=user\/).*$/))[0];

  if (currentUserId === userId) {
    profileNav.classList.add('active', 'text-white');
  }
});

function removeActiveLinks() {
  const navLinks = userNavigation.querySelectorAll('button');
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

function showProperUserSection(tableName) {
  document.querySelector(`#user${tableName}`).classList.remove('d-none');
}

userNavigation.addEventListener('click', (event) => {
  const navLink = event.target.closest('button');
  if (!navLink) return;

  removeActiveLinks();
  navLink.classList.add('active');

  hideAdminTables();
  showProperUserSection(navLink.dataset.tableName);
});

friendForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const friendship = await postRequest('friendships', friendForm);

  chatForm.friendshipId.value = friendship.friendship_id;
  postRequest('chats', chatForm);

  location.reload();
});
