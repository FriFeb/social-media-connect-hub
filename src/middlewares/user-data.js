import asyncHandler from 'express-async-handler';
import { getUser } from '../services/user-service.js';

export const getUserData = asyncHandler(async (req, res, next) => {
  const user = req.body;

  const oldUserData = await getUser(user.user_id);

  res.user = { ...oldUserData, ...user };

  next();
});
