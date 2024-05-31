import express from 'express';
import asyncHandler from 'express-async-handler';
import { getPosts } from '../services/post-service.js';
import { getPostComments } from '../services/comment-service.js';
import { getUser } from '../services/user-service.js';
const router = express.Router();

async function getAuthorInfo(authorId) {
  const author = await getUser(authorId);

  const { avatar, first_name, second_name, nickname } = author;

  return {
    author_avatar: avatar,
    author_first_name: first_name,
    author_second_name: second_name,
    author_nickname: nickname,
  };
}

router.get(
  '/',
  asyncHandler(async (req, res) => {
    // render the page
    // if user is logged in
    //  show all the stuff
    // else
    //  show only feed in sidebar
    //  and a proposal to signup or login

    const posts = await getPosts();

    const data = {};

    data.posts = await Promise.all(
      posts.map(async (post) => {
        const postAuthor = await getAuthorInfo(post.author_id);
        post = { ...post, ...postAuthor };

        const comments = await getPostComments(post.post_id);

        const postComments = await Promise.all(
          comments.map(async (comment) => {
            const commentAuthor = await getAuthorInfo(comment.author_id);

            comment = { ...comment, ...commentAuthor };

            return comment;
          })
        );

        post.comments = postComments;

        return post;
      })
    );

    res.render('home', data);
  })
);

export default router;
