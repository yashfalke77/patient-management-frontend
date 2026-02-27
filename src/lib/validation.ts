import * as z from "zod";

export const userFormValidation = z.object({
  email: z
    .email("Email Should be of Proper email")
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  password: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
});