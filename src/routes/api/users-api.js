import express from 'express';
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../../services/user-service.js';
import { validateUser } from '../../middlewares/user-validation.js';
import { getAvatarPath } from '../../middlewares/file-path.js';
import { hashPassword } from '../../middlewares/password-hash.js';
import { responseMiddleware } from '../../middlewares/response-middleware.js';
import asyncHandler from 'express-async-handler';
import { getUserFriends } from '../../services/friendship-service.js';
import { getUserPosts } from '../../services/post-service.js';
import { getUserComments } from '../../services/comment-service.js';
import { getUserChats } from '../../services/chat-service.js';
import { getUserChatMessages } from '../../services/message-service.js';
import { getUserData } from '../../middlewares/fetch-data.js';
const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const users = await getUsers();
    res.json(users);
  }),
  responseMiddleware
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const userId = req.params.id;

    const user = await getUser(userId);
    res.json(user);
  }),
  responseMiddleware
);

router.get(
  '/:id/friends',
  asyncHandler(async (req, res) => {
    const userId = req.params.id;

    const userFriends = await getUserFriends(userId);
    res.json(userFriends);
  }),
  responseMiddleware
);

router.get(
  '/:id/chats',
  asyncHandler(async (req, res) => {
    const userId = req.params.id;

    const userChats = await getUserChats(userId);
    res.json(userChats);
  }),
  responseMiddleware
);

router.get(
  '/:userId/chats/:chatId/messages',
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const chatId = req.params.chatId;

    const userChats = await getUserChatMessages(userId, chatId);
    res.json(userChats);
  }),
  responseMiddleware
);

router.get(
  '/:id/posts',
  asyncHandler(async (req, res) => {
    const userId = req.params.id;

    const userPosts = await getUserPosts(userId);
    res.json(userPosts);
  }),
  responseMiddleware
);

router.get(
  '/:id/comments',
  asyncHandler(async (req, res) => {
    const userId = req.params.id;

    const userComments = await getUserComments(userId);
    res.json(userComments);
  }),
  responseMiddleware
);

router.post(
  '/',
  validateUser,
  getAvatarPath,
  hashPassword,
  asyncHandler(async (req, res) => {
    const insertData = await createUser(res.user);
    const user = await getUser(insertData.insertId);
    res.json(user);
  }),
  responseMiddleware
);

router.post(
  '/:id',
  getUserData,
  getAvatarPath,
  asyncHandler(async (req, res) => {
    await updateUser(res.user);

    const newUserData = await getUser(res.user.user_id);

    res.json(newUserData);
  })
);

router.post(
  '/delete/:id',
  asyncHandler(async (req, res) => {
    const userId = req.params.id;

    await deleteUser(userId);
    res.cookie('user_id', '').redirect('/home');
  }),
  responseMiddleware
);

router.post(
  '/:id/delete',
  asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const data = await deleteUser(userId);
    res.json(data);
  }),
  responseMiddleware
);

export default router;
