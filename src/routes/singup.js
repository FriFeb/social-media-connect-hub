import express from 'express';
import usersDatabase from '../model/users-database.js';
import { isUserValid } from '../middleware/user-validation.js';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { getFileName, uploadFile } from '../middleware/file-upload.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const router = express.Router();

router.get('/', (req, res) => {
  res.render('test');
});

import mysql from 'mysql';
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  // password: 'root',
  database: 'social_media',
});

async function makeRequest(id) {
  const sql = `SELECT user_id, email, password, nickname, avatar, registration_time, first_name, second_name FROM users WHERE user_id = ?`;

  connection.query(sql, [id], async (error, res) => {
    if (error) throw error;
    console.log(res);
    return await res;
  });
}
router.post('/', async (req, res) => {
  const user = req.body;
  const image = req.files?.image;
  //setTimeout(() => console.log('one'), 400);
  const result = await makeRequest(4);
  result.then(
    (v) => console.log('Here' + v),
    (s) => console.log('Here' + s)
  );
  // if (image) {
  //   uploadFile(image);
  //   user.imagePath = getFileName(image);
  // } else {
  //   user.imagePath = 'default_user_image.jpeg';
  // }

  // validate input info with same way as on client side
  // isUserValid(user);

  // hash the password

  // append new row into the database
  // usersDatabase.create(user);
  // const userData = await usersDatabase.read(4);
  // console.log(userData);

  // const data = await makeRequest(4);
  // console.log(data);

  // redirect to feed and sign user in
  // res.sendStatus(200);
});

export default router;
