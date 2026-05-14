import express from "express";
import taskRoutes from "./routes/taskRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();


const PORT = process.env.PORT || 5001;

const app = express();

// Middleware để parse JSON
app.use(express.json());
app.use(cors());

app.use("/api/tasks", taskRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
});


