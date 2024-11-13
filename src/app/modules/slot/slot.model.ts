import { Schema, model } from "mongoose";
import { TSlot } from "./slot.interface";

// Create the schema with timestamps enabled
const slotSchema = new Schema<TSlot>(
  {
    service: { type: Schema.Types.ObjectId, ref: "Services", required: true },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isBooked: { type: Boolean, default: false },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

export const SlotModel = model<TSlot>("Slot", slotSchema);
