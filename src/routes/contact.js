import express from 'express';
import { authenticateUser } from '../middlewares/authentication.js';
import { getUserRoles } from '../helpers/user-role.js';
const router = express.Router();

router.get('/', authenticateUser, (req, res) => {
  const currentUserId = req.cookies.user_id;

  const userRoles = getUserRoles(currentUserId);

  res.render('contact', { ...userRoles, user_id: currentUserId });
});

export default router;
