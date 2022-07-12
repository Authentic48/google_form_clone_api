import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Form } from '../../entities/form';
import { validateRequest } from '../../middlewares/request-validation';
import { requireAuth } from '../../middlewares/require-auth';

const router = express.Router();

router.post(
  '/api/forms/',
  requireAuth,
  [
    body('title').isString().notEmpty().withMessage('title is required'),
    body('description')
      .isString()
      .notEmpty()
      .withMessage('description is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const form = Form.create({
      title,
      description,
      ownerId: req.currentUser?.id
    });
    await form.save();
    res.status(201).send(form);
  }
);

export { router as createFormRouter };
