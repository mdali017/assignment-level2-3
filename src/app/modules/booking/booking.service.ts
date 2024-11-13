import { ServicesModel } from "../services/services.model";
import { SlotModel } from "../slot/slot.model";
import { BookingModel } from "./booking.model";

const createBookingIntoDB = async (payload: any) => {
  const {
    serviceId,
    slotId,
    customer, // Use 'customer' directly from the payload
    vehicleType,
    vehicleBrand, // This is not included in the schema, so it should be removed if not used
    vehicleModel, // This is also not included in the schema, so it should be removed if not used
    manufacturingYear,
    registrationPlate,
  } = payload;

  // 1. Fetch the service
  const service = await ServicesModel.findById(serviceId);
  if (!service) {
    throw new Error("Service not found");
  }

  // 2. Fetch the slot and check if it’s already booked
  const slot = await SlotModel.findById(slotId);
  if (!slot) {
    throw new Error("Slot not found");
  }
  if (slot.isBooked) {
    throw new Error("Slot is already booked");
  }

  // 3. Create the booking with correct field names
  const bookingData = {
    customer, // Ensure this is the correct customer ID from the payload
    serviceId, // Use serviceId as defined in your schema
    slotId, // Use slotId as defined in your schema
    vehicleType,
    manufacturingYear,
    registrationPlate,
  };

  const booking = await BookingModel.create(bookingData);

  // 4. Update the slot’s isBooked status
  slot.isBooked = true;
  await slot.save();

  // 5. Populate and return booking with related data
  const populatedBooking = await booking.populate([
    { path: "customer" },
    { path: "serviceId" }, // Change this to serviceId
    { path: "slotId" }, // Change this to slotId
  ]);

  return populatedBooking;
};

const getAllBookingsFromDB = async () => {
  const result = await BookingModel.find();
  return result;
};

const getMyBookingsFromDB = async (customerId: string) => {
  const result = await BookingModel.find({ customer: customerId });
  return result;
};

export const BookingService = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getMyBookingsFromDB,
};
