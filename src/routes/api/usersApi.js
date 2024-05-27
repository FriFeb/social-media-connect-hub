import express from 'express';
import { createUser, getUser, getUsers } from '../../services/user-service.js';
import { validateUser } from '../../middlewares/user-validation.js';
import { getAvatarPath } from '../../middlewares/file-path.js';
import { hashPassword } from '../../middlewares/password-hash.js';
import { responseMiddleware } from '../../middlewares/response-middleware.js';
import asyncHandler from 'express-async-handler';
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

export default router;
