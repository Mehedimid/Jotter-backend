import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { tourServices } from "./tour.service";
import { StatusCodes } from "http-status-codes";

const createTour = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await tourServices.createTour(payload);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Successfully created tour",
    data: result,
  });
});

const getTours = catchAsync(async (req, res) => {
  const result = await tourServices.getTours(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Successfully fetched tours",
    data: result,
  });
});

const getSingleTour = catchAsync(async (req, res) => {
  const id = req.params.tourId;
  const result = await tourServices.getSingleTour(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Successfully fetched single tour",
    data: result,
  });
});

const updateTour = catchAsync(async (req, res) => {
  const id = req.params.tourId;
  const payload = req.body;
  const result = await tourServices.updateTour(id, payload);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Successfully updated tour",
    data: result,
  });
});

const deleteTour = catchAsync(async (req, res) => {
  const id = req.params.tourId;
  const result = await tourServices.deleteTour(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Successfully deleted tour",
    data: result,
  });
});

const getNextSchedule = catchAsync(async (req, res) => {
  const id = req.params.tourId;
  const result = await tourServices.getNextSchedule(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Successfully fetched next tour schedule",
    data: result,
  });
});

export const tourController = {
  createTour,
  getTours,
  getSingleTour,
  updateTour,
  deleteTour,
  getNextSchedule,
};
