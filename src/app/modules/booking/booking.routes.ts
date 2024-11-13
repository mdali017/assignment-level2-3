import express from "express";
import { BookingController } from "./booking.controller";
import { authenticateUser } from "../../middleware/authenticateUser";
import { authenticateAdmin } from "../../middleware/auth";

const router = express.Router();

router.post("/bookings", BookingController.createBooking);
router.get("/bookings", authenticateAdmin, BookingController.getAllBookings);
router.get("/my-bookings", authenticateUser, BookingController.getMyBookings);

router.patch(
  "/:id"
  // my booking controller for bookings
);

export const BookingRoute = router;
