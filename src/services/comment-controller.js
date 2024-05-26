import { query } from '../helpers/database.js';

export const getComments = async () => {
  const sql = `SELECT * FROM comments`;

  const result = await query(sql);

  return JSON.stringify(result);
};

export const getComment = async (id) => {
  const sql = `SELECT * FROM comments WHERE comment_id = ?`;

  const result = await query(sql, id);

  return JSON.stringify(result);
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

  return JSON.stringify(result);
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

  return JSON.stringify(result);
};

export const deleteComment = async (id) => {
  const sql = `DELETE FROM comments WHERE comment_id = ?`;

  const result = await query(sql, id);

  return JSON.stringify(result);
};
