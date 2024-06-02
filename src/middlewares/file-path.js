import asyncHandler from 'express-async-handler';
import { uploadFile } from '../helpers/file-upload.js';

export const getAvatarPath = asyncHandler(async (req, res, next) => {
  const avatar = req.files?.avatar;

  if (!avatar) {
    res.user.avatar = res?.user.avatar || 'default_user_avatar.jpeg';
  } else {
    res.user.avatar = await uploadFile(avatar, '/../static/avatars');
  }

  next();
});

export const getFilePath = asyncHandler(async (req, res, next) => {
  const file = req.files?.file;

  if (file) res.file = await uploadFile(file, '/../static/files');

  next();
});
