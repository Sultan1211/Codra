import express from "express";
import z, { date } from "zod";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { authMW } from "./middlewares/auth";
import { prisma } from "@repo/db";
import {
  CreateRoomSchema,
  SigninSchema,
  userSkeleton,
} from "@repo/common/common";
import cors from "cors";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL  }));
// app.use(cors());
app.post("/signup", async (req, res) => {
  const parsedData = userSkeleton.safeParse(req.body);

  if (!parsedData.success) {
    const warnings = parsedData.error.issues.map(e => e.message);
    return res.json({ message: "Incorrect inputs", warning: warnings });
  }

  try {
    const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);
    const user = await prisma.user.create({
      data: {
        email: parsedData.data.email,
        password: hashedPassword,
        name: parsedData.data.name,
      },
    });
    res.json({ userId: user.id });
  } catch (e) {
    res.status(411).json({ message: "User already exists with this username" });
  }
});

app.post("/signin", async (req, res) => {
  try {
    const parsedData = SigninSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res.json({ message: "Incorrect inputs" });
    }

    const user = await prisma.user.findFirst({
      where: { email: parsedData.data.username },
    });

    if (!user?.password) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const isMatch = await bcrypt.compare(
      parsedData.data.password,
      user.password,
    );
    if (!isMatch) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
    res.json({ token });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.post("/room", authMW, async (req, res) => {
  const parsedData = CreateRoomSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "Incorrect inputs",
    });
    return;
  }
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ message: "Not authorized" });
  }
  try {
    const room = await prisma.room.create({
      data: {
        slug: parsedData.data.slug,
        adminId: userId,
      },
    });

    res.json({
      roomId: room.id,
    });
  } catch (e) {
    res.status(411).json({
      message: "Room already exists with this name",
    });
  }
});

app.get("/room", authMW, async (req, res) => {
  const userId = req.userId;
  const rooms = await prisma.room.findMany({
    where: {
      adminId: userId,
    },
  });
  res.status(200).json({
    rooms,
  });
});

app.get("/shapes/:roomId", async (req, res) => {
  try {
    const roomId = Number(req.params.roomId);
    const messages = await prisma.chat.findMany({
      where: {
        roomId: Number(roomId),
      },
      orderBy: {
        id: "desc",
      },
      take: 1000,
    });

    res.json({
      messages,
    });
  } catch (e) {
    console.log(e);
    res.json({
      messages: [],
    });
  }
});

app.get("/room/:slug", async (req, res) => {
  const slug = req.params.slug;
  const room = await prisma.room.findFirst({
    where: {
      slug,
    },
  });

  res.json({
    room,
  });
});

app.listen(3001);
