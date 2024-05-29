import express from 'express';
import asyncHandler from 'express-async-handler';
import { getUser } from '../services/user-service.js';
import { getUserPosts } from '../services/post-service.js';
import { getUserFriends } from '../services/friendship-service.js';
import { getUserComments } from '../services/comment-service.js';
const router = express.Router();

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const user = await getUser(userId);

    if (!user.length) {
      res.render('errors/404');
      return;
    }

    const currentUser = user[0];

    currentUser.posts = await getUserPosts(userId);
    currentUser.comments = await getUserComments(userId);
    currentUser.friends = await getUserFriends(userId);

    res.render('user', currentUser);
  })
);

export default router;
