import express from 'express';
import { getUser, updateUser } from '../services/user-service.js';
import { authenticateUser } from '../middlewares/authentication.js';
import { getAvatarPath } from '../middlewares/file-path.js';
import { getUserData } from '../middlewares/user-data.js';
import asyncHandler from 'express-async-handler';
import { getUserRoles } from '../helpers/user-role.js';
const router = express.Router();

router.get(
  '/',
  authenticateUser,
  asyncHandler(async (req, res) => {
    const userRoles = getUserRoles(req.cookies.user_id);

    const user = await getUser(res.userId);

    res.render('settings', { ...user, ...userRoles });
  })
);

router.post(
  '/',
  getUserData,
  getAvatarPath,
  asyncHandler(async (req, res) => {
    await updateUser(res.user);
    const userRoles = getUserRoles(req.cookies.user_id);

    const newUserData = await getUser(res.user.user_id);

    res.render('settings', { ...newUserData, ...userRoles });
  })
);

export default router;
