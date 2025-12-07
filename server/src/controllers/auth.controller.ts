import { Request, Response } from "express";
import { prisma } from "../utils/prismaClient";

export const syncUser = async (req: Request, res: Response) => {
  try {
    const { clerkId, email } = req.body;

    let user = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          clerkId,
          email,
        },
      });
    }

    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not sync user" });
  }
};

