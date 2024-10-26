import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodOptional, ZodError } from "zod";

const validateRequest = (schema: AnyZodObject | ZodOptional<AnyZodObject>) => {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        // Only pass req.body instead of { body: req.body }
        await schema.parseAsync(req.body);
        next();
      } catch (error) {
        if (error instanceof ZodError) {
          res.status(400).json({
            success: false,
            errors: error.errors.map((err) => ({
              path: err.path,
              message: err.message,
            })),
          });
        } else {
          next(error);
        }
      }
    };
  };

export default validateRequest;
