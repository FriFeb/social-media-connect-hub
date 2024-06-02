import express from 'express';
import { getLoginUser } from '../services/user-service.js';
import { authenticateUser } from '../middlewares/authentication.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', async (req, res) => {
  // Client will send his login info
  // if user exist
  //  redirect to feed and sign him in
  // else
  //  return the same page with error section and prefilled data

  const user = req.body;

  const userData = await getLoginUser(user);
  if (!userData) {
    res.render('login');
    return;
  }

  res.cookie('user_id', userData.user_id).redirect('/home');
});

export default router;
