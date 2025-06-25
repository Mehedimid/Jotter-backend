import express, {Application, Request, Response } from 'express';
import userRouter from './module/user/user.router';
import tourRouter from './module/tour/tour.router';
import paymentRouter from './module/tour/tour.router';
import bookingRouter from './module/booking/booking.router';
import globalErrorHandler from './middlewares/globalErrorHandler';
import { routeNotFoundHandler } from './middlewares/routeNotFound';
import authRouter from './module/auth/auth.router';

const app : Application = express();

app.use(express.json());

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/tour", tourRouter)
app.use("/api/booking", bookingRouter)
app.use("/api/payment", paymentRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from setup file');
});

app.use(globalErrorHandler)
app.use("*", routeNotFoundHandler)

export default app;