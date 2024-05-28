import { query } from '../helpers/database-query.js';

export const getMessages = async () => {
  const sql = `SELECT * FROM messages`;

  const result = await query(sql);

  return result;
};

export const getChatMessages = async (id) => {
  const sql = `SELECT * FROM messages WHERE chat_id = ?`;

  const result = await query(sql, id);

  return result;
};

export const getUserChatMessages = async (userId, chatId) => {
  const sql = `SELECT * FROM messages WHERE author_id = ? AND chat_id = ?`;

  const result = await query(sql, [userId, chatId]);

  return result;
};

export const getMessage = async (id) => {
  const sql = `SELECT * FROM messages WHERE message_id = ?`;

  const result = await query(sql, id);

  return result;
};

export const createMessage = async (message) => {
  const sql = `
  INSERT INTO messages (text, attachment, author_id, chat_id) 
  VALUES (?, ?, ?, ?)`;

  const values = [
    message.text,
    message.attachment,
    message.authorId,
    message.chatId,
  ];

  const result = await query(sql, values);

  return result;
};

export const updateMessage = async (message) => {
  const sql = `
  UPDATE messages 
  SET text=?,attachment=?,author_id=?,chat_id=?
  WHERE message_id=?`;

  const values = [
    message.text,
    message.attachment,
    message.authorId,
    message.chatId,
    message.id,
  ];

  const result = await query(sql, values);

  return result;
};

export const deleteMessage = async (id) => {
  const sql = `DELETE FROM messages WHERE message_id = ?`;

  const result = await query(sql, id);

  return result;
};
