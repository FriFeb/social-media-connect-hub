import express from 'express';
import {
  createUser,
  getUserByNickname,
} from '../controllers/user-controller.js';

const router = express.Router();

router.get('/', (req, res) => {});

router.post('/', createUser, (req, res) => {});

export default router;
