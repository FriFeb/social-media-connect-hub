import asyncHandler from 'express-async-handler';

function hasExtraFields(user, maxFields) {
  const keys = Object.keys(user);

  if (keys.length > maxFields) {
    throw new Error('Extra fields are not allowed');
  }
}

function hasAllFields(user) {}

function isNameValid(user) {}

function isNicknameValid(user) {}

function isEmailValid(email) {
  const emailRegExp = /^\S{3,}@\.com$/;
  if (!emailRegExp.test(email)) {
    throw new Error('Email is not valid');
  }
}

function isPasswordValid(password) {
  const passwordRegExp = /^\S{6,}/;
  if (!passwordRegExp.test(password)) {
    throw new Error('Password is not valid');
  }
}

function isEveryFieldValid({ email, pass }) {
  if (email) isEmailValid(email);
  if (pass) isPasswordValid(pass);
}

export const validateUser = asyncHandler(async (req, res, next) => {
  const user = req.body;

  res.user = user;
  next();
});
