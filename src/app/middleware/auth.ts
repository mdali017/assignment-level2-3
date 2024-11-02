// auth.js
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../modules/user/user.model";
 // Make sure to use the correct path to your user model

export const authenticateAdmin: RequestHandler = async (req, res, next) => {
  try {
    // Check if the authorization header is present
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "Access denied. No token provided." });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the user has an admin role
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    // Attach user to the request and continue
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};
