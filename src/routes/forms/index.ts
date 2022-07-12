import express, { Request, Response } from 'express';
import { Form } from '../../entities/form';
import { requireAuth } from '../../middlewares/require-auth';

const router = express.Router();

router.get('/api/forms/', requireAuth, async (req: Request, res: Response) => {
  const forms = await Form.find({ where: { ownerId: req.currentUser?.id } });

  return res.status(200).send(forms);
});

export { router as listFormsRouter };
