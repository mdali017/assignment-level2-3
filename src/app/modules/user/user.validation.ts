import { z } from "zod";

const createUserSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    }),
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Name must be a string",
      })
      .email({
        message: "Must be a valid email",
      }),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
      })
      .min(6, { message: "Password must be at least 6 characters" }),
    phone: z.string({
      required_error: "Phone is required",
      invalid_type_error: "Phone must be a string",
    }),
    role: z.enum(["admin", "user"], {
      required_error: "Role is required",
      invalid_type_error: "Role must be a string",
    }),
    address: z.string().optional(),
  }),
});

export const userValidation = {
  createUserSchema,
};
