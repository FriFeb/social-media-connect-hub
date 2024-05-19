import express from 'express';
import { validateUser } from '../middlewares/user-validation.js';
import { getAvatarPath } from '../middlewares/file-load.js';
import { hashPassword } from '../middlewares/password-hash.js';
import asyncHandler from 'express-async-handler';
import { createUser, getUsers } from '../controllers/user-controller.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('test');
});

// Validate
// Upload image
// Create user --> Hash pass
// Redirect to the feed
router.post(
  '/',
  validateUser,
  getAvatarPath,
  hashPassword,
  asyncHandler(async (req, res) => {
    const user = await createUser(req, res);

    const parsedUser = JSON.parse(user);
    const userId = parsedUser.insertId;

    res.render('feed', { userId });
  })
);

export default router;
