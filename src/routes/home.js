import express from 'express';
import asyncHandler from 'express-async-handler';
import { getPosts } from '../services/post-service.js';
import { getPostComments } from '../services/comment-service.js';
import { getUser } from '../services/user-service.js';
import { getUserRoles } from '../helpers/user-role.js';
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
    const userRoles = getUserRoles(req.cookies.user_id);
    const user = await getUser(userRoles.currentUserId);

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

    const result = { ...userRoles, ...data, ...user };
    res.render('home', result);
  })
);

export default router;
