import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Email is invalid"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password is too long"),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Email is invalid"),
  password: z.string().min(1, "Password is required"),
});

export const assetRequestSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters").max(100),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(1000),
  referenceImageUrl: z
    .string()
    .trim()
    .url("Reference image URL is invalid")
    .optional()
    .or(z.literal("")),
  status: z.enum(["open", "in_progress", "done"]).optional(),
});
