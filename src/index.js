import './routes/routes.js';
import { initRoutes } from './routes/routes.js';
import express from 'express';
import 'express-async-errors';
import fileUpload from 'express-fileupload';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import cookieParser from 'cookie-parser';

const app = express();
const port = 3080;

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(join(__dirname, 'static')));

initRoutes(app);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

/* 
TODO: 
  - DELETION: 
    - on profile page 
      - posts
      - friends
      - comments

VIDEO:
  - visitor
    - home
    - user profile
    - 401 endpoints
  - user
    - register
    - show profile
    - create post with pic
    - create comment
    - like posts
    - like comments
    - go to user Maria 
    - add as friend
    - go to chat with Maria
    - send msgs with picture
    - go to settings, edit bio
    - show profile (posts, friends, comments)
    - send contact form
    - logout
  - admin
    - home
    - chats
    - profile
    - show admin panel
      - edit user profile
      - overview user profile
      - delete user
      - edit post
      - overview post
      - delete post
      - show contact form reply
      - delete contact form
*/
