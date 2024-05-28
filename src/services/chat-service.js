import { query } from '../helpers/database-query.js';

export const getChats = async () => {
  const sql = `SELECT * FROM chats`;

  const result = await query(sql);

  return result;
};

export const getUserChats = async (id) => {
  const sql = `
  SELECT c.chat_id, f.source_id AS 'friend_id'
  FROM chats c JOIN friendships f
  WHERE c.friendship_id = f.friendship_id AND f.target_id = ?
  UNION
  SELECT c.chat_id, f.target_id AS 'friend_id'
  FROM chats c JOIN friendships f
  WHERE c.friendship_id = f.friendship_id AND f.source_id = ?`;

  const result = await query(sql, [id, id]);

  return result;
};

export const getChat = async (id) => {
  const sql = `SELECT * FROM chats WHERE chat_id = ?`;

  const result = await query(sql, id);

  return result;
};

export const createChat = async (chat) => {
  const sql = `
  INSERT INTO chats (friendship_id) 
  VALUES (?)`;

  const values = [chat.friendshipId];

  const result = await query(sql, values);

  return result;
};

export const updateChat = async (chat) => {
  const sql = `
  UPDATE chats 
  SET friendship_id=? 
  WHERE chat_id=?`;

  const values = [chat.friendshipId, chat.id];

  const result = await query(sql, values);

  return result;
};

export const deleteChat = async (id) => {
  const sql = `DELETE FROM chats WHERE chat_id = ?`;

  const result = await query(sql, id);

  return result;
};
