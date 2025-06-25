import mongoose from 'mongoose';
import { Tour } from '../tour/tour.model';
import { IBooking } from './booking.interface';
import Booking from './booking.model';

const createBooking = async (payload: IBooking): Promise<IBooking> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { tour, bookedSlots } = payload;
    const requiredTour = await Tour.findById(tour);
    if (!requiredTour) {
      throw new Error('Tour not found');
    }

    if (requiredTour.availableSeats < bookedSlots) {
      throw new Error('slot is not available');
    }

    const totalPrice = requiredTour.price * bookedSlots;
    payload.totalPrice = totalPrice;
    payload.bookingStatus = 'pending';

    const booking = await Booking.create(payload, { session });

    const newAvailableSeats = requiredTour.availableSeats - bookedSlots;
    const updateAvailableSeats = await Tour.findByIdAndUpdate(
      booking[0].tour,
      { availableSeats: newAvailableSeats },
      { new: true, session },
    );

    if (updateAvailableSeats) {
      throw new Error('tour is not updated');
    }

    await session.commitTransaction();
    await session.endSession();

    return booking[0];
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

const cancelBooking = async (bookingId: string): Promise<IBooking> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const booking = await Booking.findById(bookingId).session(session);
    if (!booking) {
      throw new Error('Booking not found');
    }

    // Check if the booking is already cancelled
    if (booking.bookingStatus === 'cancelled') {
      throw new Error('Booking is already cancelled');
    }

    // Update booking status to 'cancelled'
    booking.bookingStatus = 'cancelled';
    await booking.save({ session });

    // Restore availableSeats for the associated tour
    const updatedTour = await Tour.findByIdAndUpdate(
      booking.tour,
      { $inc: { availableSeats: booking.bookedSlots } }, // Add back booked slots
      { new: true, session }
    );

    if (!updatedTour) {
      throw new Error('Tour update failed');
    }

    // Commit transaction
    await session.commitTransaction();
    await session.endSession();

    return booking;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};


const getBooking = async () => {
  const result = await Booking.find();
  return result;
};

const getSingleBooking = async (paramId: string) => {
  const result = await Booking.findById(paramId);
  return result;
};

const updateBooking = async (BookingId: string, payload: Partial<IBooking>) => {
  const result = await Booking.findByIdAndUpdate(BookingId, payload, {
    new: true,
  });
  return result;
};

export const bookingServices = {
  createBooking,
  getBooking,
  getSingleBooking,
  updateBooking,
  cancelBooking
};
