import express from 'express';
import { handleServerError } from '../middlewares/error-handler.js';
import usersApi from './api/usersApi.js';
import postsApi from './api/postsApi.js';
const router = express.Router();

router.use('/users', usersApi);
router.use('/posts', postsApi);

router.use((err, req, res, next) => {
  res.status(500).json('Server Error');
});

export default router;
