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

  - Recreate templates with html and bootstrap
    + signup
    + login

    + sidebar block
    + header block

    + home          
    + messages      
    + settings      
    + user          
    - contact form 

    - admin panel

  - Commit changes

  - Add form validation

  - Check for the authentication on each page
*/
