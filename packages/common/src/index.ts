import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();

export const jwtSecret = process.env.JWT_SECRET || "";

export const userSkeleton = z.object({
  email: z.string().email("Please enter a valid email"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const SigninSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string(),
});

export const CreateRoomSchema = z.object({
  slug: z.string().min(3).max(20),
});
