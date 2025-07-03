import { Request, Response } from "express";

import { favouriteService } from "./favourite.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

export const addToFavourite = catchAsync(async (req: Request, res: Response) => {
  const { fileId } = req.body;
  const userId = req.params.userId

  const result = await favouriteService.addToFavourite(userId, fileId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "File added to favourites",
    data: result,
  });
});

export const removeFromFavourite = catchAsync(async (req: Request, res: Response) => {
  const  fileId = req.params.fileId;
  const result = await favouriteService.removeFromFavourite(fileId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "File removed from favourites",
    data: result,
  });
});

export const getFavourites = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;

  const result = await favouriteService.getUserFavourites(userId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Favourite files retrieved successfully",
    data: result,
  });
});
