import express from 'express';
import asyncHandler from 'express-async-handler';
import { responseMiddleware } from '../../middlewares/response-middleware.js';
import {
  createFriendship,
  getFriendship,
  getFriendships,
} from '../../services/friendship-service.js';
const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const friendships = await getFriendships();
    res.json(friendships);
  }),
  responseMiddleware
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const friendshipId = req.params.id;

    const friendship = await getFriendship(friendshipId);
    res.json(friendship);
  }),
  responseMiddleware
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    res.friendship = req.body;

    const insertData = await createFriendship(res.friendship);
    const friendship = await getFriendship(insertData.insertId);
    res.json(friendship);
  }),
  responseMiddleware
);

export default router;
