import express from "express";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from "../routes/userRoutes.js";
import { errorHandler, notFound } from "../middleware/errorMiddleware.js";
import connectDB from "../config/connectDB.js";
import cookieParser from "cookie-parser";
import fantasyRoutes from "../routes/fantasyRoutes.js";
import cron from "node-cron";

//schedule a task to run every 3 days
cron.schedule("0 0 */3 * *", async () => {
  try {
    console.log("Running cron job");
    const dreamTeam = await insertDreamTeam(await fetchDreamTeam());
    console.log(dreamTeam);
  } catch (error) {
    console.error(error);
  }
});

const port = process.env.PORT;

connectDB();

const app = express();

// Middleware to parse JSON data
app.use(express.json());

// Middleware to parse URL encoded data(form data)
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/fantasy", fantasyRoutes);

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App running on port::: ${port}`);
});
