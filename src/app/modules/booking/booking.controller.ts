import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingService } from "./booking.service";

const createBooking = catchAsync(async (req, res, next) => {
  const result = await BookingService.createBookingIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Booking created successfully",
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res, next) => {
  const result = await BookingService.getAllBookingsFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All bookings fetched successfully",
    data: result,
  });
});

const getMyBookings = catchAsync(async (req, res, next) => {
  const userId = req.user?.id;
  // console.log(userId)
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
