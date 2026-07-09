import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

dotenv.config({
  path: ".env",
});
export function authMW(req: Request, res: Response, next: NextFunction) {
  const token: any = req.headers.authorization?.split(" ")[1];

  const decoded = jwt.verify(token, process?.env["jwtsecret"]!);

  if (decoded) {
    req.userId = (decoded as JwtPayload).userId;
    next();
  }

  return res.status(403).json({
    msg: "Unauthorized user",
  });
}
