import express from 'express';
import { getLoginUser } from '../services/user-service.js';
import { authenticateUser } from '../middlewares/authentication.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', async (req, res) => {
  const user = req.body;

  const userData = await getLoginUser(user);

  if (!userData) {
    const data = { login: user.login, isLoginFailed: true };
    res.render('login', data);
    return;
  }

  res.cookie('user_id', userData.user_id).redirect('/home');
});

export default router;
