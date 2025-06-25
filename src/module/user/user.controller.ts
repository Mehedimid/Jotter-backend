import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.service";
import { StatusCodes } from "http-status-codes";

const createUser = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await userServices.createUser(payload);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Successfully created user",
    data: result,
  });
});

const getUser = catchAsync(async (req, res) => {
  const result = await userServices.getUser();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Successfully fetched users",
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const id = req.params.userId;
  const result = await userServices.getSingleUser(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Successfully fetched user",
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const id = req.params.userId;
  const payload = req.body;
  const result = await userServices.updateUser(id, payload);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Successfully updated user",
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const id = req.params.userId;
  const result = await userServices.deleteUser(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Successfully deleted user",
    data: result,
  });
});

export const userController = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
