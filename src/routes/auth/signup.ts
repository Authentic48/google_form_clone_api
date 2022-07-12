import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { validateRequest } from '../../middlewares/request-validation';
import { Password } from '../../services/password';
import { User } from '../../entities/user';
import { BadRequestError } from '../../errors/bad-request-error';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is invalid'),
    body('password')
      .trim()
      .isLength({ min: 5, max: 15 })
      .withMessage('Password must be between 4 and 15 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    // Destructuring the incoming data
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      throw new BadRequestError('User already exist');
    }

    const hashedPassword = await Password.Hash(password);
    const user = User.create({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstName: user.name,
      },
      process.env.JWT_KEY!
    );

    req.session = { jwt: token };
    
    return res.status(201).send(user);
  }
);

export { router as signupRouter };
