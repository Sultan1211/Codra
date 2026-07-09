import "express";
import { Interface } from "readline";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}
