import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.cookie('user_id', '').redirect('home');
});

export default router;
