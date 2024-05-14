import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Here are the users');
});

router.get('/3', (req, res) => {
  res.send('Here are the third user');
});

export default router;
