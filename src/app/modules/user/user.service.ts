import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "assignment_three_secret_key";
const createUserIntoDB = async (payload: TUser) => {
  if (payload.password) {
    payload.password = await bcrypt.hash(payload.password, 10);
  }

  const result = await UserModel.create(payload);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

const loginUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {

  // console.log(payload);

  // Find user by email
  const user = await UserModel.findOne({ email: payload.email });
  console.log(user);
  if (!user) {
    throw new Error("User not found");
  }

  // Check password
  const isPasswordCorrect = await bcrypt.compare(
    payload.password,
    user.password
  );
  if (!isPasswordCorrect) {
    throw new Error("Invalid credentials");
  }

  // Generate JWT
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "1h" } // Adjust expiration as needed
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

export const UserService = {
  createUserIntoDB,
  getAllUsersFromDB,
  loginUserIntoDB,
};
