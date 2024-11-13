import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../modules/user/user.model";

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authenticateAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(403).json({ message: "Access denied. No token provided." });
      return;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      res.status(500).json({ message: "JWT_SECRET is not defined." });
      return;
    }

    const decoded = jwt.verify(token, secret) as { id: string };
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    if (user.role !== "admin") {
      res.status(403).json({ message: "Access denied. Admins only." });
      return;
    }

    (req as AuthenticatedRequest).user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
    return;
  }
};
