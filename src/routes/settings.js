import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  // render the page
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

export default router;
