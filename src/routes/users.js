import express from 'express';
const router = express.Router();

router.get('/:id', (req, res) => {
  // read the row from the db for the user with proper ID
  // if no user
  //  return 404
  // else
  //  render page with user info inserted
});

export default router;
