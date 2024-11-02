import { Schema, model, connect } from "mongoose";
import { TSlot } from "./slot.interface";
// import { TUser, TUserName } from "./user.interface";

// 2. Create a Schema corresponding to the document interface.
const slotSchema = new Schema<TSlot>({
  service: { type: Schema.Types.ObjectId, ref: "Services" },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  isBooked: { type: Boolean, default: false },
});

// 3. Create a Model.
export const SlotModel = model<TSlot>("Slot", slotSchema);
