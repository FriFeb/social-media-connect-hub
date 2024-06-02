import express from 'express';
import asyncHandler from 'express-async-handler';
import { responseMiddleware } from '../../middlewares/response-middleware.js';
import { createChat, getChat, getChats } from '../../services/chat-service.js';
import { getChatMessages } from '../../services/message-service.js';
const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const chats = await getChats();
    res.json(chats);
  }),
  responseMiddleware
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const chatId = req.params.id;

    const chat = await getChat(chatId);
    res.json(chat);
  }),
  responseMiddleware
);

router.get(
  '/:id/messages',
  asyncHandler(async (req, res) => {
    const chatId = req.params.id;

    const chatMessages = await getChatMessages(chatId);
    res.json(chatMessages);
  }),
  responseMiddleware
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const insertData = await createChat(req.body);
    const chat = await getChat(insertData.insertId);
    res.json(chat);
  }),
  responseMiddleware
);

export default router;
