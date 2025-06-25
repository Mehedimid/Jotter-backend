import { Router } from 'express';
import { bookingController } from './booking.controller';


const bookingRouter = Router();

bookingRouter.get('/:bookingId', bookingController.getSingleBooking);

bookingRouter.patch('/cancel-booking/:bookingId', bookingController.cancelBooking);

bookingRouter.get('/', bookingController.getBooking);

bookingRouter.post('/create-booking', bookingController.createBooking);

bookingRouter.put('/:bookingId', bookingController.updateBooking);

export default bookingRouter;