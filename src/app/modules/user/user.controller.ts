import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";

const createUser = catchAsync(async (req, res, next) => {
  const userData = req.body.body; // Access the nested `body` property
  const result = await UserService.createUserIntoDB(userData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res, next) => {
  const result = await UserService.getAllUsersFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All users fetched successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req, res, next) => {
  const userData = req.body; 
  const result = await UserService.loginUserIntoDB(userData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

export const UserController = {
  createUser,
  getAllUsers,
  loginUser,
};
