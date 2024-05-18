import express from 'express';
import usersRouter from './api/users.js';

const router = express.Router();

router.use('/users', usersRouter);
// router.use('/posts', postsRouter);
// router.use('/comments', commentsRouter);
// router.use('/friendships', friendshipsRouter);
// router.use('/chats', chatsRouter);
// router.use('/messages', messagesRouter);

export default router;
