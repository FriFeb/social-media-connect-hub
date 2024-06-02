import express from 'express';
import asyncHandler from 'express-async-handler';
import { responseMiddleware } from '../../middlewares/response-middleware.js';
import { createForm, getForm, getForms } from '../../services/form-service.js';
import { getFilePath } from '../../middlewares/file-path.js';
const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const forms = await getForms();
    res.json(forms);
  }),
  responseMiddleware
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const formId = req.params.id;

    const form = await getForm(formId);
    res.json(form);
  }),
  responseMiddleware
);

router.post(
  '/',
  getFilePath,
  asyncHandler(async (req, res) => {
    const formData = { ...req.body, attachment: res.file };

    const insertData = await createForm(formData);
    const form = await getForm(insertData.insertId);
    res.json(form);
  }),
  responseMiddleware
);

export default router;
