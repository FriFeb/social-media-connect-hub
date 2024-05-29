import './routes/routes.js';
import { initRoutes } from './routes/routes.js';
import express from 'express';
import 'express-async-errors';
import fileUpload from 'express-fileupload';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const port = 3080;

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(join(__dirname, 'static')));

initRoutes(app);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

/* 
TODO: 
  - let the content on the pages to be loaded from db
    + home (posts, comments)
    - user profile
    - chats (get all the chats)

  - add the possibility to add content:
    - user registration
    - post creation
    - comment creation
    - admin form creation

  - show different users

  - Add form validation
*/
