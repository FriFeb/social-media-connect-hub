import { query } from '../helpers/database-query.js';

export const getUserFriends = async (id) => {
  const sql = `
  SELECT source_id AS 'friend_id' FROM friendships WHERE target_id = ?
  UNION 
  SELECT target_id AS 'friend_id' FROM friendships WHERE source_id = ? `;

  const result = await query(sql, [id, id]);

  return result;
};

export const getFriendships = async () => {
  const sql = `SELECT * FROM friendships`;

  const result = await query(sql);

  return result;
};

export const getFriendship = async (id) => {
  const sql = `SELECT * FROM friendships WHERE friendship_id = ?`;

  const result = await query(sql, id);

  return result;
};

export const createFriendship = async (friendship) => {
  const sql = `
  INSERT INTO friendships (source_id, target_id)
  VALUES (?, ?)`;

  const values = [friendship.sourceId, friendship.targetId];

  const result = await query(sql, values);

  return result;
};

export const updateFriendship = async (friendship) => {
  const sql = `
  UPDATE friendships 
  SET source_id=?,target_id=?
  WHERE friendship_id=?`;

  const values = [friendship.sourceId, friendship.targetId, friendship.id];

  const result = await query(sql, values);

  return result;
};

export const deleteFriendship = async (id) => {
  const sql = `DELETE FROM friendships WHERE friendship_id = ?`;

  const result = await query(sql, id);

  return result;
};
