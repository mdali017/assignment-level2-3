import { Schema, model, connect } from "mongoose";
import { TUser, TUserName } from "./user.interface";

const userNameSchema = new Schema<TUserName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<TUser>({
  name: { type: userNameSchema, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], required: true },
  address: { type: String, default: null },
});

// 3. Create a Model.
export const UserModel = model<TUser>("User", userSchema);
