import { query } from '../helpers/database-query.js';

export const getPosts = async () => {
  const sql = `SELECT * FROM posts`;

  const result = await query(sql);

  return result;
};

export const getUserPosts = async (id) => {
  const sql = `SELECT * FROM posts WHERE author_id = ?`;

  const result = await query(sql, id);

  return result;
};

export const getPost = async (id) => {
  const sql = `SELECT * FROM posts WHERE post_id = ?`;

  const result = await query(sql, id);

  return result;
};

export const createPost = async (post) => {
  const sql = `
  INSERT INTO posts (text, attachment, author_id) 
  VALUES (?, ?, ?)`;

  const values = [post.text, post.attachment, post.authorId];

  const result = await query(sql, values);

  return result;
};

export const updatePost = async (post) => {
  const sql = `
  UPDATE posts 
  SET text=?,attachment=?,author_id=?
  WHERE post_id=?`;

  const values = [post.text, post.attachment, post.authorId, post.id];

  const result = await query(sql, values);

  return result;
};

export const deletePost = async (id) => {
  const sql = `DELETE FROM posts WHERE post_id = ?`;

  const result = await query(sql, id);

  return result;
};
