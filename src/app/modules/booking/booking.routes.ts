import express from "express";
import { BookingController } from "./booking.controller";
import { authenticateUser } from "../../middleware/authenticateUser";

const router = express.Router();

router.post("/bookings", BookingController.createBooking);
router.get("/bookings", BookingController.getAllBookings);
router.get("/my-bookings", authenticateUser, BookingController.getMyBookings);

router.patch(
  "/:id"
  // my booking controller for bookings
);

export const BookingRoute = router;
