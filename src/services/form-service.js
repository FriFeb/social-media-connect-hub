import { query } from '../helpers/database-query.js';

export const getForms = async () => {
  const sql = `SELECT * FROM forms`;

  const result = await query(sql);

  return result;
};

export const getForm = async (id) => {
  const sql = `SELECT * FROM forms WHERE form_id = ?`;

  const result = await query(sql, id);

  return result[0];
};

export const createForm = async (form) => {
  const sql = `
  INSERT INTO forms (subject, text, attachment, author_id) 
  VALUES (?, ?, ?, ?)`;

  const values = [form.subject, form.text, form.attachment, form.authorId];

  const result = await query(sql, values);

  return result;
};

export const updateForm = async (form) => {
  const sql = `
  UPDATE forms 
  SET text=?,attachment=?,author_id=?
  WHERE form_id=?`;

  const values = [form.text, form.attachment, form.authorId, form.id];

  const result = await query(sql, values);

  return result;
};

export const deleteForm = async (id) => {
  const sql = `DELETE FROM forms WHERE form_id = ?`;

  const result = await query(sql, id);

  return result;
};
