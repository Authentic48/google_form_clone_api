import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Form } from '../../entities/form';
import { Question } from '../../entities/question';
import { NotAuthorizedError } from '../../errors/not-authorized-error';
import { NotFoundError } from '../../errors/not-found-error';
import { validateRequest } from '../../middlewares/request-validation';
import { requireAuth } from '../../middlewares/require-auth';

const router = express.Router();

router.post(
  '/api/forms/:id/questions',
  requireAuth,
  [
    body('question').isString().notEmpty().withMessage('question is required'),
    body('question_type')
      .notEmpty()
      .withMessage('question_type is required')
      .isString()
      .withMessage('question type must be a string')
      .isIn(['input', 'textarea', ' select'])
      .withMessage('question type doesn\t contain valid value'),
    body('isRequired')
      .isBoolean()
      .withMessage('isRequired type is invalid')
      .notEmpty()
      .withMessage('required is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { question, question_type, isRequired } = req.body;

    const form = await Form.findOneBy({ id: req.params.id });

    if (!form) {
      throw new NotFoundError();
    }

    if (form.ownerId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    const newQuestion = Question.create({
      question,
      question_type,
      isRequired,
      formId: req.params.id
    });

    await newQuestion.save();

    res.status(201).send(newQuestion);
  }
);

export { router as createQuestionRouter };
