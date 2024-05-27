import { query } from '../helpers/database.js';

export const getFriendships = async () => {
  const sql = `SELECT * FROM friendships`;

  const result = await query(sql);

  return JSON.stringify(result);
};

export const getFriendship = async (id) => {
  const sql = `SELECT * FROM friendships WHERE friendship_id = ?`;

  const result = await query(sql, id);

  return JSON.stringify(result);
};

export const createFriendship = async (friendship) => {
  const sql = `
  INSERT INTO friendships (source_id, target_id)
  VALUES (?, ?)`;

  const values = [friendship.sourceId, friendship.targetId];

  const result = await query(sql, values);

  return JSON.stringify(result);
};

export const updateFriendship = async (friendship) => {
  const sql = `
  UPDATE friendships 
  SET source_id=?,target_id=?
  WHERE friendship_id=?`;

  const values = [friendship.sourceId, friendship.targetId, friendship.id];

  const result = await query(sql, values);

  return JSON.stringify(result);
};

export const deleteFriendship = async (id) => {
  const sql = `DELETE FROM friendships WHERE friendship_id = ?`;

  const result = await query(sql, id);

  return JSON.stringify(result);
};
