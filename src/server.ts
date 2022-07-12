import express from 'express';
import 'dotenv/config';
import { connectDB } from './config/db';

const app = express();
app.use(express.json());

// DB connection
connectDB()

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});