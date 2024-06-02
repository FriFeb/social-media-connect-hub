import express from 'express';
import { authenticateUser } from '../middlewares/authentication.js';
import { getUserRoles } from '../helpers/user-role.js';
import { getUserChats } from '../services/chat-service.js';
import asyncHandler from 'express-async-handler';
import { getUser } from '../services/user-service.js';
import { getChatMessages } from '../services/message-service.js';
const router = express.Router();

router.get(
  '/',
  authenticateUser,
  asyncHandler(async (req, res) => {
    const userRoles = getUserRoles(req.cookies.user_id);

    let data = {};

    data.user = await getUser(userRoles.currentUserId);

    const chats = await getUserChats(userRoles.currentUserId);
    data.chats = await Promise.all(
      chats.map(async (chat) => {
        const friend = await getUser(chat.friend_id);
        const messages = await getChatMessages(chat.chat_id);

        return { ...chat, friend, messages };
      })
    );

    res.render('chats', { ...data, ...userRoles });
  })
);

export default router;
