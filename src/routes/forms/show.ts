import express, { Request, Response } from 'express';
import { Form } from '../../entities/form';
import { requireAuth } from '../../middlewares/require-auth';
import { NotFoundError } from '../../errors/not-found-error';

const router = express.Router();

router.get(
  '/api/forms/:id',
  requireAuth,
  async (req: Request, res: Response) => {
    const form = await Form.findOne({ where: { id: req.params.id }, relations: ['questions'] });
    if (!form) {
      throw new NotFoundError();
    }

    return res.status(200).send(form);
  }
);

export { router as showFormRouter };
