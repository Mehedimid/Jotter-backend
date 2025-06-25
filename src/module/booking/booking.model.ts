import { model, Schema } from "mongoose";
import { IBooking } from "./booking.interface";

export const bookingSchema = new Schema<IBooking>({
  user:{
    type: Schema.Types.ObjectId,
    required: true,
  },
  tour:{
    type: Schema.Types.ObjectId,
    required: true,
  },
  bookedSlots: {
    type: Number,
    required: true,
  },
  bookingStatus:{
    type: String,
    enum:["pending" , "paid" , "cancelled"],
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
},{
  timestamps:true
});


const Booking = model<IBooking>('Booking', bookingSchema);

export default Booking;