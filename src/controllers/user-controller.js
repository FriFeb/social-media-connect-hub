import asyncHandler from 'express-async-handler';
import { query } from '../helpers/database.js';

export const getUsers = asyncHandler(async (req, res, next) => {
  const sql = `SELECT * FROM users`;

  const result = await query(sql);

  res.json(result);
});

export const getUser = asyncHandler(async (req, res, next) => {
  const sql = `SELECT * FROM users WHERE user_id = ?`;

  const result = await query(sql, req.params.id);

  res.json(result);
});

export const createUser = asyncHandler(async (req, res, next) => {
  const sql = `
  INSERT INTO users (email, password, nickname, avatar, first_name, second_name) 
  VALUES (?, ?, ?, ?, ?, ?)`;

  const values = [
    res.user.email,
    res.user.pass,
    res.user.nickname,
    res.user.avatar,
    res.user.firstName,
    res.user.secondName,
  ];

  const result = await query(sql, values);

  res.json(result);
});

export const updateUser = asyncHandler(async (req, res, next) => {
  const sql = `
  UPDATE users 
  SET email=?,password=?,nickname=?,avatar=?,first_name=?,second_name=? 
  WHERE user_id=?`;

  const values = [
    res.user.email,
    res.user.pass,
    res.user.nickname,
    res.user.avatar,
    res.user.firstName,
    res.user.secondName,
    res.user.id,
  ];

  const result = await query(sql, values);

  res.json(result);
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  const sql = `DELETE FROM users WHERE user_id = ?`;

  const result = await query(sql, req.body.id);

  res.json(result);
});
