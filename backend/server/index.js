import express from "express";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from "../routes/userRoutes.js";
import { errorHandler, notFound } from "../middleware/errorMiddleware.js";
import connectDB from "../config/connectDB.js";

const port = process.env.PORT;

connectDB();

const app = express();

// Middleware to parse JSON data
app.use(express.json());

// Middleware to parse URL encoded data(form data)
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App running on port::: ${port}`);
});
