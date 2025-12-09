import { Request, Response } from "express";
import { prisma } from "../utils/prismaClient";

export const syncUser = async (req: Request, res: Response) => {
  try {
    const { clerkId, email, fullName } = req.body;

    if (!clerkId || !email) {
      return res.status(400).json({ error: "Missing clerkId or email" });
    }

    let user = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!user) {
      // CREATE
      user = await prisma.user.create({
        data: {
          clerkId,
          email,
          fullName: fullName || "",
        },
      });
    } else {
      // UPDATE (in case email/name changed in Clerk)
      user = await prisma.user.update({
        where: { clerkId },
        data: {
          email,
          fullName: fullName || user.fullName,
        },
      });
    }

    res.json({ user });
  } catch (err) {
    console.error("Sync user error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
