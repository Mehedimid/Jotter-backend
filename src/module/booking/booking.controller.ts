import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { bookingServices } from "./booking.service";

const createBooking = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await bookingServices.createBooking(payload);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Successfully created booking",
    data: result,
  });
});

const getBooking = catchAsync(async (req, res) => {
  const result = await bookingServices.getBooking();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Successfully fetched bookings",
    data: result,
  });
});

const getSingleBooking = catchAsync(async (req, res) => {
  const id = req.params.bookingId;
  const result = await bookingServices.getSingleBooking(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Successfully fetched booking",
    data: result,
  });
});

const cancelBooking = catchAsync(async (req, res) => {
  const id = req.params.bookingId;
  const result = await bookingServices.cancelBooking(id)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Successfully cancelled booking",
    data: result,
  });
});

const updateBooking = catchAsync(async (req, res) => {
  const id = req.params.bookingId;
  const payload = req.body;
  const result = await bookingServices.updateBooking(id, payload);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Successfully updated booking",
    data: result,
  });
});

export const bookingController = {
  createBooking,
  getBooking,
  getSingleBooking,
  updateBooking,
  cancelBooking
};
