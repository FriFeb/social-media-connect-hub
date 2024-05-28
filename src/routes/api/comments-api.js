import express from 'express';
import asyncHandler from 'express-async-handler';
import { responseMiddleware } from '../../middlewares/response-middleware.js';
import {
  createComment,
  getComment,
  getComments,
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

export default router;
