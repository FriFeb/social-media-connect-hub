import express from 'express';
import { createPost, getPost, getPosts } from '../../services/post-service.js';
import asyncHandler from 'express-async-handler';
import { responseMiddleware } from '../../middlewares/response-middleware.js';
import { getPostComments } from '../../services/comment-service.js';
import { getFilePath } from '../../middlewares/file-path.js';
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
  getFilePath,
  asyncHandler(async (req, res) => {
    const postData = { ...req.body, attachment: res.file };

    const insertData = await createPost(postData);
    const post = await getPost(insertData.insertId);
    res.json(post);
  }),
  responseMiddleware
);

export default router;
