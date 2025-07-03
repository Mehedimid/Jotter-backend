import express, {Application, Request, Response } from 'express';
import globalErrorHandler from './middlewares/globalErrorHandler';
import { routeNotFoundHandler } from './middlewares/routeNotFound';
import cors from 'cors';
import userRouter from './module/users/user.router';
import { FolderRoutes } from './module/folders/folder.router';
import { FileRoutes } from './module/files/file.router';
import { favouriteRoutes } from './module/favourites/favourite.router';

const app : Application = express();

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:5000',
      'https://jotter-server.vercel.app'
    ],
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api/user", userRouter)
app.use("/api/folder", FolderRoutes)
app.use("/api/file", FileRoutes)
app.use("/api/favourite", favouriteRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from setup file jotter');
});

app.use(globalErrorHandler)
app.use("*", routeNotFoundHandler)

export default app;
