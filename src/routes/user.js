import express from 'express';
const router = express.Router();

router.get('/:id', (req, res) => {
  // retrieve user data

  // render the page with proper data
  res.send('user');
});

export default router;
