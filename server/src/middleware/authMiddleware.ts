import type { Request, Response, NextFunction } from "express";
import { clerk } from "../config/clerk";

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization;

    if (!header)
      return res.status(401).json({ error: "Missing Authorization header" });

    const token = header.replace("Bearer ", "");

    // Verify Clerk JWT
    const session = await clerk.authenticateRequest({
      headerToken: token,
    });

    const userId = (session as any)?.userId;
    if (!userId)
      return res.status(401).json({ error: "Invalid token" });

    (req as any).userId = userId;

    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ error: "Unauthorized" });
  }
}
