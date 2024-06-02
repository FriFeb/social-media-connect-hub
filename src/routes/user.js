import express from 'express';
import asyncHandler from 'express-async-handler';
import { getUser } from '../services/user-service.js';
import { getUserPosts } from '../services/post-service.js';
import { getUserFriends } from '../services/friendship-service.js';
import { getUserComments } from '../services/comment-service.js';
import { getUserRoles } from '../helpers/user-role.js';
const router = express.Router();

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const currentUserId = req.cookies.user_id;
    const userRoles = getUserRoles(currentUserId);

    const userId = req.params.id;

    const isProfileOwner = userId === currentUserId;

    const user = await getUser(userId);

    if (!user) {
      res.render('errors/404');
      return;
    }

    user.posts = await getUserPosts(userId);
    user.comments = await getUserComments(userId);

    const friendIds = await getUserFriends(userId);
    user.friends = await Promise.all(
      friendIds.map(async (friendId) => {
        const userId = friendId.user_id;
        return await getUser(userId);
      })
    );

    const currentUserFriendIds = await getUserFriends(currentUserId);

    const isFriend = currentUserFriendIds.some(
      (user) => user.user_id == userId
    );

    res.render('user', {
      ...user,
      ...userRoles,
      currentUserId,
      isFriend,
      isProfileOwner,
    });
  })
);

export default router;
