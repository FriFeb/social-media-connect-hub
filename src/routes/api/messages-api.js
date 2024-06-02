import express from 'express';
import asyncHandler from 'express-async-handler';
import { responseMiddleware } from '../../middlewares/response-middleware.js';
import {
  createMessage,
  getMessage,
  getMessages,
} from '../../services/message-service.js';
import { getFilePath } from '../../middlewares/file-path.js';
const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const messages = await getMessages();
    res.json(messages);
  }),
  responseMiddleware
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const messageId = req.params.id;

    const message = await getMessage(messageId);
    res.json(message);
  }),
  responseMiddleware
);

router.post(
  '/',
  getFilePath,
  asyncHandler(async (req, res) => {
    const formData = { ...req.body, attachment: res.file };

    const insertData = await createMessage(formData);
    const message = await getMessage(insertData.insertId);
    res.json(message);
  }),
  responseMiddleware
);

export default router;
