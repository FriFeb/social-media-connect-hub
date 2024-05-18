import asyncHandler from 'express-async-handler';
import db from '../helpers/database-connection.js';
import { isUserValid } from '../middlewares/user-validation.js';
import { getFileName, uploadFile } from '../middlewares/file-upload.js';

const makeRequest = (sql, values = null) => {
  return new Promise((resolve, reject) => {
    db.query(sql, values, (error, rows) => {
      if (error) return reject(error);

      return resolve(rows);
    });
  });
};

export const getUsers = asyncHandler(async (req, res, next) => {
  const sql = `SELECT * FROM users`;

  const result = await makeRequest(sql);
  console.log(result);

  res.json(result);
});

export const getUserByNickname = asyncHandler(async (req, res, next) => {
  const sql = `SELECT * FROM users WHERE nickname = ?`;

  res.result = await makeRequest(sql, req.params.nickname);

  return res.result;
});

export const createUser = asyncHandler(async (req, res, next) => {
  const user = req.body;
  const image = req.params?.image;

  if (image) {
    uploadFile(image);
    user.imagePath = getFileName(image);
  } else {
    user.imagePath = 'default_user_image.jpeg';
  }

  // validate input info with same way as on client side
  // isUserValid(user);

  // hash the password

  // append new row into the database
  const sql = `
  INSERT INTO users (email, password, nickname, avatar, first_name, second_name) 
  VALUES (?, ?, ?, ?, ?, ?)`;

  const values = [
    user.email,
    user.pass,
    user.nickName,
    user.imagePath,
    user.firstName,
    user.secondName,
  ];

  const result = await makeRequest(sql, values);

  // redirect to feed and sign user in
  res.json(result);
});

// NEED TO SAVE USER ID IN THE FORM ON ITS GENERATION
export const updateUser = asyncHandler(async (req, res, next) => {
  const user = req.body;
  const image = req.params?.image;

  if (image) {
    uploadFile(image);
    user.imagePath = getFileName(image);
  } else {
    user.imagePath = 'default_user_image.jpeg';
  }

  // validate input info with same way as on client side
  // isUserValid(user);

  // hash the password

  // append new row into the database
  const sql = `
  UPDATE users 
  SET email=?,password=?,nickname=?,avatar=?,first_name=?,second_name=? 
  WHERE user_id=?`;

  const values = [
    user.email,
    user.pass,
    user.nickName,
    user.imagePath,
    user.firstName,
    user.secondName,
    user.id,
  ];

  const result = await makeRequest(sql, values);

  // redirect to feed and sign user in
  res.json(result);
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  const sql = `DELETE FROM users WHERE user_id = ?`;

  res.result = await makeRequest(sql, req.body.id);

  return res.result;
});
