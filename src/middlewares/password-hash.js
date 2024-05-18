import asyncHandler from 'express-async-handler';

export const hashPassword = asyncHandler(async (req, res, next) => {
  const password = res.user.pass;

  // hash the password

  next();
});
