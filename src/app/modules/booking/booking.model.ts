import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface"; // Adjust the path if necessary

// Define the schema based on the TBooking interface
const bookingSchema = new Schema<TBooking>({
  customer: { type: Schema.Types.ObjectId, ref: "Customer", required: true }, // Ensure "Customer" matches your actual model name
  service: { type: Schema.Types.ObjectId, ref: "Service", required: true }, // Adjust "Service" to match your actual service model name
  slot: { type: Schema.Types.ObjectId, ref: "Slot", required: true }, // Ensure "Slot" matches your slot model name
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
