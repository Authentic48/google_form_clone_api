import { createConnection } from 'typeorm';

export const connectDB = async () => {
  try {
    await createConnection({
      type: 'postgres',
      host:  process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [],
    });
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
