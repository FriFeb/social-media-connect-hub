import express from 'express';
import { handleServerError } from '../middlewares/error-handler.js';
import usersApi from './api/users-api.js';
import postsApi from './api/posts-api.js';
import commentsApi from './api/comments-api.js';
import formsApi from './api/forms-api.js';
import friendshipsApi from './api/friendships-api.js';
import chatsApi from './api/chats-api.js';
import messagesApi from './api/messages-api.js';
const router = express.Router();

router.use('/users', usersApi);
router.use('/posts', postsApi);
router.use('/comments', commentsApi);
router.use('/forms', formsApi);
router.use('/friendships', friendshipsApi);
router.use('/chats', chatsApi);
router.use('/messages', messagesApi);

router.use(handleServerError);

export default router;
