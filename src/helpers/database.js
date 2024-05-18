import mysql from 'mysql2/promise';
import config from './db-config.js';

export async function query(sql, params) {
  const conn = await mysql.createConnection(config.db);
  const [results] = await conn.query(sql, params);

  await conn.end();

  return results;
}
