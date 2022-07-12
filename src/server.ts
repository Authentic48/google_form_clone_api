import express from 'express';
import 'dotenv/config';
import 'express-async-errors';
import cookieSession from 'cookie-session';


import { connectDB } from './config/db';
import { signupRouter } from './routes/auth/signup';
import { signinRouter } from './routes/auth/signin';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import { signoutRouter } from './routes/auth/signout';
import { createFormRouter } from './routes/forms/create';
import { currentUser } from './middlewares/current-user';
import { listFormsRouter } from './routes/forms';
import { showFormRouter } from './routes/forms/show';
import { updateFormRouter } from './routes/forms/update';
import { deleteFormRouter } from './routes/forms/delete';
import { createQuestionRouter } from './routes/questions/create';
import { updateQuestionRouter } from './routes/questions/update';
import { deleteQuestionRouter } from './routes/questions/delete';


const app = express();
app.use(express.json());
app.set('trust proxy', true);
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

// DB connection
connectDB()

//signed user middleware
app.use(currentUser)

// Auth routes
app.use(signupRouter)
app.use(signinRouter)
app.use(signoutRouter)

// Forms routes
app.use(createFormRouter)
app.use(listFormsRouter)
app.use(showFormRouter)
app.use(updateFormRouter)
app.use(deleteFormRouter)


// Questions 
app.use(createQuestionRouter)
app.use(updateQuestionRouter)
app.use(deleteQuestionRouter)


// fallback route 404 
app.all('*', async () => {
    throw new NotFoundError();
});


app.use(errorHandler);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});