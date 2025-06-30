import express, {Application, Request, Response } from 'express';
import globalErrorHandler from './middlewares/globalErrorHandler';
import { routeNotFoundHandler } from './middlewares/routeNotFound';
import cors from 'cors';

const app : Application = express();

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:5000',
    ],
    credentials: true,
  }),
);

app.use(express.json());

// app.use("/api")

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from setup file');
});

app.use(globalErrorHandler)
app.use("*", routeNotFoundHandler)

export default app;
