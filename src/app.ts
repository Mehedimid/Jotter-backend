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
      'https://restaurant-client-virid.vercel.app',
    ],
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api/auth", )

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from setup file');
});

app.use(globalErrorHandler)
app.use("*", routeNotFoundHandler)

export default app;

function cors(arg0: { origin: string[]; credentials: boolean; }): any {
  throw new Error('Function not implemented.');
}
