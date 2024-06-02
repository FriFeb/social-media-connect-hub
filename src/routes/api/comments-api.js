import express from 'express';
import asyncHandler from 'express-async-handler';
import { responseMiddleware } from '../../middlewares/response-middleware.js';
import {
  createComment,
  getComment,
  getComments,
  likeComment,
  unlikeComment,
} from '../../services/comment-service.js';
const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const comments = await getComments();
    res.json(comments);
  }),
  responseMiddleware
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const commentId = req.params.id;

    const comment = await getComment(commentId);
    res.json(comment);
  }),
  responseMiddleware
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    res.comment = req.body;

    const insertData = await createComment(res.comment);
    const comment = await getComment(insertData.insertId);
    res.json(comment);
  }),
  responseMiddleware
);

router.post(
  '/:id/like',
  asyncHandler(async (req, res) => {
    const commentId = req.params.id;

    const data = await likeComment(commentId);
    res.json(data);
  }),
  responseMiddleware
);

router.post(
  '/:id/unlike',
  asyncHandler(async (req, res) => {
    const commentId = req.params.id;

    const data = await unlikeComment(commentId);
    res.json(data);
  }),
  responseMiddleware
);

export default router;
