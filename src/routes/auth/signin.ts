import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../../entities/user';
import { BadRequestError } from '../../errors/bad-request-error';
import { Password } from '../../services/password';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../../middlewares/request-validation';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').trim().notEmpty().withMessage('Password must be supplied'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ where: { email: email } });
    if (!existingUser) {
      throw new BadRequestError('Invalid Credentials');
    }

    const passwordsMatch = await Password.Compare(
      password,
      existingUser.password
    );

    if (!passwordsMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    req.session = { jwt: token };

    return res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
