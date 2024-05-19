import { query } from '../helpers/database.js';

export const getUsers = async () => {
  const sql = `SELECT * FROM users`;

  const result = await query(sql);

  return JSON.stringify(result);
};

export const getUser = async (id) => {
  const sql = `SELECT * FROM users WHERE user_id = ?`;

  const result = await query(sql, id);

  return JSON.stringify(result);
};

export const createUser = async (user) => {
  const sql = `
  INSERT INTO users (email, password, nickname, avatar, first_name, second_name) 
  VALUES (?, ?, ?, ?, ?, ?)`;

  const values = [
    user.email,
    user.pass,
    user.nickname,
    user.avatar,
    user.firstName,
    user.secondName,
  ];

  const result = await query(sql, values);

  return JSON.stringify(result);
};

export const updateUser = async (user) => {
  const sql = `
  UPDATE users 
  SET email=?,password=?,nickname=?,avatar=?,first_name=?,second_name=? 
  WHERE user_id=?`;

  const values = [
    user.email,
    user.pass,
    user.nickname,
    user.avatar,
    user.firstName,
    user.secondName,
    user.id,
  ];

  const result = await query(sql, values);

  return JSON.stringify(result);
};

export const deleteUser = async (id) => {
  const sql = `DELETE FROM users WHERE user_id = ?`;

  const result = await query(sql, id);

  return JSON.stringify(result);
};
