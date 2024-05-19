import express from 'express';
import { deleteUser } from '../controllers/user-controller.js';
const router = express.Router();

router.get('/', (req, res) => {
  // render the page
  res.send('setting');
});

router.put('/', (req, res) => {
  // get current user ID
  // if no user
  //  return 404
  // else
  //  assign new values from the req to the user values from the database
  // validate as on user creation
  // change the data in the database
});

router.delete('/', deleteUser, (req, res) => {});
export default router;
