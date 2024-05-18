import express from 'express';
import { validateUser } from '../middlewares/user-validation.js';
import { getAvatarPath } from '../middlewares/file-load.js';
import { hashPassword } from '../middlewares/password-hash.js';
import asyncHandler from 'express-async-handler';
import { createUser } from '../controllers/user-controller.js';

const router = express.Router();

// Render the page
router.get('/', (req, res) => {});

// Validate
// Upload image
// Create user --> Hash pass
// Redirect to the feed
router.post(
  '/',
  validateUser,
  getAvatarPath,
  hashPassword,
  // asyncHandler(async (req, res) => {
  //   const newUser = await fetch()
  // })
  createUser
);

export default router;
