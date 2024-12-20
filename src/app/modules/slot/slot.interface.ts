import { Types } from "mongoose";

export type TSlot = {
  service: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  status: "available" | "cencelled";
};
