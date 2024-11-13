import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface"; // Adjust the path if necessary

// Define the schema based on the TBooking interface
const bookingSchema = new Schema<TBooking>({
  customer: { type: Schema.Types.ObjectId, ref: "User", required: true },
  serviceId: { type: Schema.Types.ObjectId, ref: "Services", required: true },
  slotId: { type: Schema.Types.ObjectId, ref: "Slot", required: true },
  vehicleType: {
    type: String,
    enum: [
      "car",
      "truck",
      "SUV",
      "van",
      "motorcycle",
      "bus",
      "electricVehicle",
      "hybridVehicle",
      "bicycle",
      "tractor",
    ],
    required: true,
  },
  manufacturingYear: { type: Number, required: true },
  registrationPlate: { type: String, required: true },
});

// Create the Booking model
export const BookingModel = model<TBooking>("Booking", bookingSchema);
