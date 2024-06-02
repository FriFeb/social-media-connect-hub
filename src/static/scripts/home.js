import { postRequest } from './helpers.js';

function toggleLikeIcon(likeIcon) {
  if (likeIcon.classList.contains('bi-heart')) {
    likeIcon.classList.add('bi-heart-fill');
    likeIcon.classList.remove('bi-heart');
  } else {
    likeIcon.classList.add('bi-heart');
    likeIcon.classList.remove('bi-heart-fill');
  }
}

function changeLikesNumber(likeSpan, operation) {
  switch (operation) {
    case '-':
      likeSpan.innerHTML = likeSpan.innerHTML - 1;
      break;
    case '+':
      likeSpan.innerHTML = +likeSpan.innerHTML + 1;
      break;
  }
}

function changePostLikes(likeSection, form, endpoint, operation) {
  postRequest(`posts/${form.postId.value}/${endpoint}`, form);

  toggleLikeIcon(likeSection.querySelector('i'));
  changeLikesNumber(likeSection.querySelector('span'), operation);
}

function changeCommentLikes(likeSection, form, endpoint, operation) {
  postRequest(`comments/${form.commentId.value}/${endpoint}`, form);

  toggleLikeIcon(likeSection.querySelector('i'));
  changeLikesNumber(likeSection.querySelector('span'), operation);
}

document.addEventListener('DOMContentLoaded', async () => {
  homeNav.classList.add('active', 'text-white');
});

posts.addEventListener('click', (event) => {
  const target = event.target;
  const post = target.closest('.card');
  const commentElement = target.closest('.comment-toggle');

  if (!commentElement) return;

  const commentSection = post.querySelector('.card-footer');

  if (commentSection.classList.contains('d-none')) {
    commentSection.classList.remove('d-none');
  } else {
    commentSection.classList.add('d-none');
  }
});

postForm.addEventListener('submit', (event) => {
  event.preventDefault();

  postRequest('posts', postForm);
  postForm.reset();
});

const commentsForms = document.getElementsByClassName('comment-form');

for (let form of commentsForms) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    postRequest('comments', form);
    form.reset();
  });
}

const postLikeForms = document.getElementsByClassName('post-like-form');

for (let form of postLikeForms) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (form.dataset.isLiked) {
      changePostLikes(form.querySelector('button'), form, 'unlike', '-');
      form.dataset.isLiked = '';
    } else {
      changePostLikes(form.querySelector('button'), form, 'like', '+');
      form.dataset.isLiked = '1';
    }
  });
}

const commentLikeForms = document.getElementsByClassName('comment-like-form');

for (let form of commentLikeForms) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (form.dataset.isLiked) {
      changeCommentLikes(form.querySelector('button'), form, 'unlike', '-');
      form.dataset.isLiked = '';
    } else {
      changeCommentLikes(form.querySelector('button'), form, 'like', '+');
      form.dataset.isLiked = '1';
    }
  });
}
``;
