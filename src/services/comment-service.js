import { query } from '../helpers/database-query.js';

export const getComments = async () => {
  const sql = `SELECT * FROM comments ORDER BY creation_time DESC`;

  const result = await query(sql);

  return result;
};

export const getPostComments = async (id) => {
  const sql = `SELECT * FROM comments WHERE post_id = ?`;

  const result = await query(sql, id);

  return result;
};

export const getUserComments = async (id) => {
  const sql = `SELECT * FROM comments WHERE author_id = ? ORDER BY creation_time DESC`;

  const result = await query(sql, id);

  return result;
};

export const getComment = async (id) => {
  const sql = `SELECT * FROM comments WHERE comment_id = ?`;

  const result = await query(sql, id);

  return result[0];
};

export const createComment = async (comment) => {
  const sql = `
  INSERT INTO comments (text, attachment, author_id, post_id) 
  VALUES (?, ?, ?, ?)`;

  const values = [
    comment.text,
    comment.attachment,
    comment.authorId,
    comment.postId,
  ];

  const result = await query(sql, values);

  return result;
};

export const updateComment = async (comment) => {
  const sql = `
  UPDATE comments 
  SET text=?,attachment=?,author_id=?,post_id=?
  WHERE comment_id=?`;

  const values = [
    comment.text,
    comment.attachment,
    comment.authorId,
    comment.postId,
    comment.id,
  ];

  const result = await query(sql, values);

  return result;
};

export const likeComment = async (id) => {
  const sql = `
  UPDATE comments 
  SET likes_number = likes_number + 1
  WHERE comment_id=?`;

  const result = await query(sql, id);

  return result;
};

export const unlikeComment = async (id) => {
  const sql = `
  UPDATE comments 
  SET likes_number = likes_number - 1
  WHERE comment_id=?`;

  const result = await query(sql, id);

  return result;
};

export const deleteComment = async (id) => {
  const sql = `DELETE FROM comments WHERE comment_id = ?`;

  const result = await query(sql, id);

  return result;
};
