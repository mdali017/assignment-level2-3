import { Types } from "mongoose";

export type TBooking = {
  customer: Types.ObjectId;
  service: Types.ObjectId;
  slot: Types.ObjectId;
  vehicleType:
    | "car"
    | "truck"
    | "SUV"
    | "van"
    | "motorcycle"
    | "bus"
    | "electricVehicle"
    | "hybridVehicle"
    | "bicycle"
    | "tractor";
  manufacturingYear: number;
  registrationPlate: string;
};
