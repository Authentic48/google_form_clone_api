import { DataSource } from 'typeorm';
export const dataSource = new DataSource({
  type: 'postgres',
  host:  process.env.DB_HOST,
  port: +process.env.DB_PORT!,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: ['src/entities/*.ts'],
  synchronize: true
})

export const connectDB = async () => {
  try {
    await dataSource.initialize()
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
