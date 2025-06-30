import { Request, Response } from 'express';
import { userServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const result = await userServices.createUser(userData);
    res.status(200).json({
      status: true,
      message: 'successfully created user',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: 'something went wrong',
      error: error.errors,
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUser();
    res.status(200).json({
      status: true,
      message: 'successfully get users data',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: 'something went wrong',
      error: error.errmsg,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const result = await userServices.getSingleUser(id);
    res.status(200).json({
      status: true,
      message: 'successfully get single user data',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: 'something went wrong',
      error: error.errmsg,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const data = req.body;
    const result = await userServices.updateUser(id, data);
    res.status(200).json({
      status: true,
      message: 'successfully updated data',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'something went wrong',
      error: error,
    });
  }
};

export const userControllers = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
};
