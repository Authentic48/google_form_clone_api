import express, { Request, Response } from 'express';
import { Form } from '../../entities/form';
import { NotAuthorizedError } from '../../errors/not-authorized-error';
import { NotFoundError } from '../../errors/not-found-error';
import { requireAuth } from '../../middlewares/require-auth';

const router = express.Router();

router.delete(
  '/api/forms/:id',
  requireAuth,
  async (req: Request, res: Response) => {

    const form = await Form.findOneBy({ id: req.params.id })

    if(!form){
        throw new NotFoundError();
    }

    if(form.ownerId !== req.currentUser!.id){
        throw new NotAuthorizedError();
    }

    await form.remove();

    res.status(200).send({});
  }
);

export { router as deleteFormRouter };
