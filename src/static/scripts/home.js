document.addEventListener('DOMContentLoaded', async () => {
  homeNav.classList.add('active', 'text-white');
});

function toggleLikeIcon(likeIcon) {
  if (likeIcon.classList.contains('bi-heart')) {
    likeIcon.classList.add('bi-heart-fill');
    likeIcon.classList.remove('bi-heart');
  } else {
    likeIcon.classList.add('bi-heart');
    likeIcon.classList.remove('bi-heart-fill');
  }
}

function increaseLikesNumber(likeSpan) {}

function likePost(likeSection, postId) {
  // toggleLikeIcon(likeSection.querySelector('i'))
  // increaseLikesNumber(likeSection.querySelector('span'))
  // add isliked attribute to check like
  // change the icon
  // increase the number
  // call the service to increase
  // if isLiked
  // change the icon
  // decrease the number
  // call the service to decrease
}

posts.addEventListener('click', (event) => {
  const target = event.target;
  const post = target.closest('.card');
  const postId = post.dataset.postId;

  if (target.closest('.post-like')) {
    likePost(target.closest('.post-like'), postId);
  }

  if (target.closest('.comment-toggle')) {
    const commentSection = post.querySelector('.card-footer');

    if (commentSection.classList.contains('d-none')) {
      commentSection.classList.remove('d-none');
    } else {
      commentSection.classList.add('d-none');
    }
  }
});
