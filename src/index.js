import './routes/routes.js';
import { initRoutes } from './routes/routes.js';
import express from 'express';
import 'express-async-errors';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
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
  - authentication
    - implement binding token with user id on log/reg

    - check for auth token on pages:
      - HOME
        if no token
          - remove ability to like (O)
        else 
          - add ability to like
          - show post and comment without refresh (O)

  - DELETION: 
    - on profile page 
      - posts
      - friends
      - comments

    - admin panel
      - user 
      - post
      - form 

  - EDITING:
    - admin panel
      - user
        + show detailed info about user
      - form
        - show detailed info about form
      - post
        - show detailed info about post
*/
