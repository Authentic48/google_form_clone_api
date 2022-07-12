import express, { Request, Response } from 'express';
import { Form } from '../../entities/form';
import { Question } from '../../entities/question';
import { NotAuthorizedError } from '../../errors/not-authorized-error';
import { NotFoundError } from '../../errors/not-found-error';
import { requireAuth } from '../../middlewares/require-auth';

const router = express.Router();

router.delete(
  '/api/forms/:id/questions/:questionId',
  requireAuth,
  async (req: Request, res: Response) => {

    const form = await Form.findOneBy({ id: req.params.id });

    if (!form) {
      throw new NotFoundError();
    }

    if (form.ownerId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    const existingQuestion = await Question.findOne({ where: { id: req.params.questionId, formId: form.id } });

    if(!existingQuestion){
        throw new NotFoundError()
    }

    await existingQuestion.remove();

    res.status(200).send({});
  }
);

export { router as deleteQuestionRouter };
