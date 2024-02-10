const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

app.use("/user", userRouter);
app.use("/post", postRouter);

app.listen(8000, () => {
  console.log("server connected at 8000");
});
