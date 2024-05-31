import './routes/routes.js';
import { initRoutes } from './routes/routes.js';
import express from 'express';
import 'express-async-errors';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const port = 3080;

const __dirname = dirname(fileURLToPath(import.meta.url));

// app.use(express.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );
// app.use(express.urlencoded({ extended: true }));
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
  - let the content on the pages to be loaded from db
    - home
      - like post func
      - like comment func
    - user profile
      + create posts section
      + create comments section
      - create friends section
    - chats (get all the chats)

  - authentication
    - provide each form with current user id

  - admin
    - review user / form on view icon
    - add deletion ability
*/
