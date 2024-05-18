import express from 'express';
import { getUsers, getUserByNickname } from '../controllers/user-controller.js';
const router = express.Router();

router.get('/', getUsers, (req, res) => {});

router.get('/:nickname', getUserByNickname, (req, res) => {});

export default router;
