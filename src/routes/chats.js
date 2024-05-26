import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  // get current user ID
  // retrieve all the chats where current user ID is involved
  // render the page
  res.render('chats');
});

router.get('/:id', (req, res) => {
  // grab the chat with proper id form the database
  // render the page
});

export default router;
