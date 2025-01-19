import { Schema, model, connect } from "mongoose";
import { TServices } from "./services.interface";
// import { TUser, TUserName } from "./user.interface";

// 2. Create a Schema corresponding to the document interface.
const servicesSchema = new Schema<TServices>({
  name: { type: String, required: true },
  image: { type: String },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
});

// 3. Create a Model.
export const ServicesModel = model<TServices>("Services", servicesSchema);
