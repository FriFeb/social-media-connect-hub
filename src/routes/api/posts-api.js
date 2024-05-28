import express from 'express';
import { createPost, getPost, getPosts } from '../../services/post-service.js';
import asyncHandler from 'express-async-handler';
import { responseMiddleware } from '../../middlewares/response-middleware.js';
import { getPostComments } from '../../services/comment-service.js';
const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const posts = await getPosts();
    res.json(posts);
  }),
  responseMiddleware
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const postId = req.params.id;

    const post = await getPost(postId);
    res.json(post);
  }),
  responseMiddleware
);

router.get(
  '/:id/comments',
  asyncHandler(async (req, res) => {
    const postId = req.params.id;

    const comments = await getPostComments(postId);
    res.json(comments);
  }),
  responseMiddleware
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    res.post = req.body;

    const insertData = await createPost(res.post);
    const post = await getPost(insertData.insertId);
    res.json(post);
  }),
  responseMiddleware
);

export default router;
