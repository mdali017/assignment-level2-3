import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingService } from "./booking.service";
import { Request, Response, NextFunction } from "express";

// Define AuthenticatedRequest to include `user` property
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

const createBooking = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await BookingService.createBookingIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Booking created successfully",
    data: result,
  });
});

const getAllBookings = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await BookingService.getAllBookingsFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All bookings fetched successfully",
    data: result,
  });
});

const getMyBookings = catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const userId: any = req.user?.id; // TypeScript now recognizes `user`
  const result = await BookingService.getMyBookingsFromDB(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "My bookings fetched successfully",
    data: result,
  });
});

export const BookingController = {
  createBooking,
  getAllBookings,
  getMyBookings,
};
