import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import resumeRoutes from "./routes/resume.routes";


export const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

app.get("/", (req, res) => {
  res.send("Mosaicr Server is running!!!");
});