import './routes/routes.js';
import { initRoutes } from './routes/routes.js';
import express from 'express';

const app = express();
const port = 3000;

initRoutes(app);

app.listen(port, () => {
  console.log('Listening');
});

/* 
TODO: 

  Controller:

    - basic routing:
      - users
      - posts
      - messages
      - registration
      - login
      - ...


  Model:

    - basic database:
      - set up connection to a db
      - try basic operations with data
      - ...


  View:

    - basic view:
      - return registration page 
      - return login form
*/
