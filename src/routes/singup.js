import express from 'express';
import { validateUser } from '../middlewares/user-validation.js';
import { getAvatarPath } from '../middlewares/file-path.js';
import { hashPassword } from '../middlewares/password-hash.js';
import asyncHandler from 'express-async-handler';
import { createUser, getUsers } from '../services/user-service.js';

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
  asyncHandler(async (req, res, next) => {
    const response = await fetch('http://localhost:3080/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });
    if (response.error) throw new Error(response.message);
    res.redirect('/home');
  })
);

export default router;
