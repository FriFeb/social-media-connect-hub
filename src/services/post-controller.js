import { query } from '../helpers/database.js';

export const getPosts = async () => {
  const sql = `SELECT * FROM posts`;

  const result = await query(sql);

  return JSON.stringify(result);
};

export const getPost = async (id) => {
  const sql = `SELECT * FROM posts WHERE post_id = ?`;

  const result = await query(sql, id);

  return JSON.stringify(result);
};

export const createPost = async (post) => {
  const sql = `
  INSERT INTO posts (text, attachment, author_id) 
  VALUES (?, ?, ?)`;

  const values = [post.text, post.attachment, post.authorId];

  const result = await query(sql, values);

  return JSON.stringify(result);
};

export const updatePost = async (post) => {
  const sql = `
  UPDATE posts 
  SET text=?,attachment=?,author_id=?
  WHERE post_id=?`;

  const values = [post.text, post.attachment, post.authorId, post.id];

  const result = await query(sql, values);

  return JSON.stringify(result);
};

export const deletePost = async (id) => {
  const sql = `DELETE FROM posts WHERE post_id = ?`;

  const result = await query(sql, id);

  return JSON.stringify(result);
};
