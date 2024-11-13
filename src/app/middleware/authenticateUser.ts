import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "assignment_three_secret_key";

// Define a custom request interface
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ message: "Authorization header missing" });
      return;
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as {
      role: string;
      id: string;
    };

    if (decoded.role !== "user") {
      res.status(403).json({ message: "Forbidden: Users only" });
      return;
    }

    // Use type assertion to add `user` property to `req`
    (req as AuthenticatedRequest).user = { id: decoded.id, role: decoded.role };

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
    return;
  }
};
