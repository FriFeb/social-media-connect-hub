import { query } from '../helpers/database-query.js';

export const getUsers = async () => {
  const sql = `SELECT user_id, email, nickname, avatar, registration_time, first_name, second_name, biography FROM users`;

  const result = await query(sql);

  return result;
};

export const getUser = async (id) => {
  const sql = `SELECT user_id, email, nickname, avatar, registration_time, first_name, second_name, biography FROM users WHERE user_id = ?`;

  const result = await query(sql, id);

  return result[0];
};

export const createUser = async (user) => {
  const sql = `
  INSERT INTO users (email, password, nickname, avatar, first_name, second_name) 
  VALUES (?, ?, ?, ?, ?, ?)`;

  const values = [
    user.email,
    user.password,
    user.nickname,
    user.avatar,
    user.firstName,
    user.secondName,
  ];

  const result = await query(sql, values);

  return result;
};

export const updateUser = async (user) => {
  const sql = `
  UPDATE users 
  SET email=?,password=?,nickname=?,biography=?,avatar=?,first_name=?,second_name=? 
  WHERE user_id=?`;

  const values = [
    user.email,
    user.password,
    user.nickname,
    user.biography,
    user.avatar,
    user.firstName,
    user.secondName,
    user.id,
  ];

  const result = await query(sql, values);

  return result;
};

export const deleteUser = async (id) => {
  const sql = `DELETE FROM users WHERE user_id = ?`;

  const result = await query(sql, id);

  return result;
};
