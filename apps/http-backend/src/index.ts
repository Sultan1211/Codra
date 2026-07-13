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
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors())
app.post("/signup", async (req, res) => {
  const parsedData = userSkeleton.safeParse(req.body);
  console.log(parsedData,"data")
  if (!parsedData.success) {
    console.log(parsedData.error);
    res.json({
      message: "Incorrect inputs",
    });
    return;
  }
  try {
    const user = await prisma.user.create({
      data: {
        email: parsedData.data?.email,
        // TODO: Hash the pw
        password: parsedData.data.password,
        name: parsedData.data.name,
      },
    });
    res.json({
      userId: user.id,
    });
  } catch (e) {
    res.status(411).json({
      message: "User already exists with this username",
    });
  }
});

app.post("/signin", async (req, res) => {
  const parsedData = SigninSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "Incorrect inputs",
    });
    return;
  }

  // TODO: Compare the hashed pws here
  const user = await prisma.user.findFirst({
    where: {
      email: parsedData.data.username,
      password: parsedData.data.password,
    },
  });

  if (!user) {
    res.status(403).json({
      message: "Not authorized",
    });
    return;
  }

  const token = jwt.sign(
    {
      userId: user?.id,
    },
    process?.env["jwtsecret"]!,
  );

  res.json({
    token,
  });
});

app.post("/room", authMW, async (req, res) => {
  const parsedData = CreateRoomSchema.safeParse(req.body);
  console.log("reaching in room creation : ",parsedData)
  if (!parsedData.success) {
    res.json({
      message: "Incorrect inputs",
    });
    return;
  }
  // @ts-ignore: TODO: Fix this
  const userId = req.userId;
  if (!userId) {
    return;
  }
  try {
    const room = await prisma.room.create({
      data: {
        slug: parsedData.data.name,
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

app.get("/shapes/:roomId", async (req, res) => {
  try {
    const roomId = Number(req.params.roomId);
    console.log(req.params.roomId);
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
