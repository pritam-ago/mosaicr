import { Request, Response } from "express";
import { prisma } from "../utils/prismaClient";

export const getUserResumes = async (req: Request, res: Response) => {
  const userId = (req as any).userId;

  const resumes = await prisma.resume.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  res.json({ resumes });
};

export const createResume = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const { fileName, template, data, theme } = req.body;

  const resume = await prisma.resume.create({
    data: {
      userId,
      fileName,
      template,
      data,
      theme,
      user: {
        connect: { id: userId },
      },
    },
  });

  res.json({ resume });
};

export const updateResume = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const { id } = req.params;
  const { fileName, template, data } = req.body;
  const resume = await prisma.resume.updateMany({
    where: { id: Number(id), userId },
    data: { fileName, template, data },
  });
  if (resume.count === 0) {
    return res.status(404).json({ error: "Resume not found" });
  }
  res.json({ resume });
};

export const deleteResume = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const { id } = req.params;
  const resume = await prisma.resume.deleteMany({
    where: { id: Number(id), userId },
  });
  if (resume.count === 0) {
    return res.status(404).json({ error: "Resume not found" });
  }
  res.json({ resume });
};  