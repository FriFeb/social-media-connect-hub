import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('This is the main page, OH YEAH');
});

router.get('/about', (req, res) => {
  res.send('This is the about page');
});

export default router;
