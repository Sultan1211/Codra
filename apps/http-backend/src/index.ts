import express from "express";
import z, { date } from "zod";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { authMW } from "./middlewares/auth";
import { prisma } from "@repo/db/client";
import { userSkeleton } from "@repo/common/common";
dotenv.config({
  path: ".env",
});

const app = express();
app.use(express.json());

app.post("/sign-up", async (req, res) => {
  const { username, password, name } = req.body;

  const result = userSkeleton.safeParse({ username, password, name });
  if (result.success) {
    const user = await prisma.user.create({
      data: { username, password, name },
    });
    return res.status(200).json({
      msg: "The user got signed up successfully",
    });
  }
  return res.status(400).json({
    errors: result.error.issues,
  });
});

app.post("/sign-in", async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findFirst({
    where: { username: username, password: password },
  });
  if (user) {
    const token = await jwt.sign(
      { userId: user?.id },
      process?.env["jwtsecret"]!,
    );
    return res.json({
      msg: "user sign in successfull",
      token,
    });
  }
  return res.json({
    msg: "Invalid user",
  });
});

app.post("/create-room", authMW, async (req, res) => {
  const roomSlug = req.body;
  if (!roomSlug) {
    return res.status(404).json({
      msg: "Room name not found",
    });
  }
  const userId = req.userId;
  if (!userId) {
    return;
  }
  const response = await prisma.room.create({
    data: {
      slug: roomSlug,
      adminId: userId,
    },
  });
  if (!response) {
    res.status(500).json({
      msg: "Room creation failed",
    });
  }
  res.status(200).json({
    msg: "Room created successfully",
  });
});

app.get("/room/:slug" ,async (req,res)=>{
  const slug = req.params.slug;
  const room = await prisma.room.findFirst({
    where:{
      slug
    }
  })
  if(!room){
    return res.status(400).json({
      msg: "Room not found"
    })
  }
  res.status(200).json({
    room
  })
})

app.listen(3002);
