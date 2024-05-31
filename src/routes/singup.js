import express from 'express';
import { validateUser } from '../middlewares/user-validation.js';
import { getAvatarPath } from '../middlewares/file-path.js';
import { hashPassword } from '../middlewares/password-hash.js';
import asyncHandler from 'express-async-handler';
import { createUser } from '../services/user-service.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('signup');
});

router.post(
  '/',
  validateUser,
  getAvatarPath,
  hashPassword,
  asyncHandler(async (req, res) => {
    const insertData = await createUser(res.user);
    res.redirect(`/user/${insertData.insertId}`);
  })
);

export default router;
