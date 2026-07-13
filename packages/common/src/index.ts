import { z } from "zod";
import dotenv from "dotenv"
dotenv.config()

export const jwtSecret = process.env.JWT_SECRET || ""

export const userSkeleton = z.object({
  email: z
    .string()
    .min(6)
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores",
    ),
  name: z
    .string()
    .min(6)
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores",
    ),
  password: z
    .string()
    .min(8)
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one letter, one number, and one special character",
    ),
});


export const SigninSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string(),
})

export const CreateRoomSchema = z.object({
    name: z.string().min(3).max(20),
})
