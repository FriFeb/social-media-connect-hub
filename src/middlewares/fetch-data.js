import asyncHandler from 'express-async-handler';
import { getUser } from '../services/user-service.js';
import { getPost } from '../services/post-service.js';

export const getUserData = asyncHandler(async (req, res, next) => {
  const user = req.body;

  const oldUserData = await getUser(user.user_id);

  res.user = { ...oldUserData, ...user };

  next();
});

export const getPostData = asyncHandler(async (req, res, next) => {
  const post = req.body;

  const oldPostData = await getPost(post.post_id);

  res.post = { ...oldPostData, ...post };

  next();
});
