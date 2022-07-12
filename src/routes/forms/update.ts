import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Form } from '../../entities/form';
import { NotAuthorizedError } from '../../errors/not-authorized-error';
import { NotFoundError } from '../../errors/not-found-error';
import { validateRequest } from '../../middlewares/request-validation';
import { requireAuth } from '../../middlewares/require-auth';

const router = express.Router();

router.put(
  '/api/forms/:id',
  requireAuth,
  [
    body('title').notEmpty().withMessage('title is required'),
    body('description').notEmpty().withMessage('description is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, description } = req.body;

    const form = await Form.findOneBy({ id: req.params.id })

    if(!form){
        throw new NotFoundError();
    }

    if(form.ownerId !== req.currentUser?.id){
        throw new NotAuthorizedError();
    }

    const attrs: Partial<Form> = { title, description };

    Object.assign(form, attrs);
    
    await form.save();

    res.status(200).send(form);
  }
);

export { router as updateFormRouter };
