import { query } from '../helpers/database.js';

export const getChats = async () => {
  const sql = `SELECT * FROM chats`;

  const result = await query(sql);

  return JSON.stringify(result);
};

export const getChat = async (id) => {
  const sql = `SELECT * FROM chats WHERE chat_id = ?`;

  const result = await query(sql, id);

  return JSON.stringify(result);
};

export const createChat = async (chat) => {
  const sql = `
  INSERT INTO chats (friendship_id) 
  VALUES (?)`;

  const values = [chat.friendshipId];

  const result = await query(sql, values);

  return JSON.stringify(result);
};

export const updateChat = async (chat) => {
  const sql = `
  UPDATE chats 
  SET friendship_id=? 
  WHERE chat_id=?`;

  const values = [chat.friendshipId, chat.id];

  const result = await query(sql, values);

  return JSON.stringify(result);
};

export const deleteChat = async (id) => {
  const sql = `DELETE FROM chats WHERE chat_id = ?`;

  const result = await query(sql, id);

  return JSON.stringify(result);
};
