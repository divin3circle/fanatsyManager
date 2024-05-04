import express from "express";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from "../routes/userRoutes.js";
import { errorHandler, notFound } from "../middleware/errorMiddleware.js";

const port = process.env.PORT;

const app = express();

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App running on port::: ${port}`);
});
