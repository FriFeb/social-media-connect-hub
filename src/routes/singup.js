import express from 'express';
import { validateUser } from '../middlewares/user-validation.js';
import { getAvatarPath } from '../middlewares/file-path.js';
import { hashPassword } from '../middlewares/password-hash.js';
import asyncHandler from 'express-async-handler';
import { createUser, getUsers } from '../controllers/user-controller.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('signup');
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
  async (req, res, next) => {
    try {
      const user = await createUser(req, res);

      const parsedUser = JSON.parse(user);
      const userId = parsedUser.insertId;

      res.render('feed', { userId });
    } catch (error) {
      next();
    }
  }
);

router.use('/', (req, res) => {
  res.status(500).render('errors/500');
});

export default router;
