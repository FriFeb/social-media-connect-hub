import express from 'express';
import { getPost, getPosts } from '../../services/post-service.js';
import asyncHandler from 'express-async-handler';
import { responseMiddleware } from '../../middlewares/response-middleware.js';
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

    const posts = await getPost(postId);
    res.json(posts);
  }),
  responseMiddleware
);

export default router;
