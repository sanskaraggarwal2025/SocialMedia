import express from 'express';
import mongoose from "mongoose";
const app = express();
import cors from "cors";
app.use(cors());
app.use(express.json());
import userRouter from "./routes/userRoutes";
import postRouter from "./routes/postRoutes";
import uploadRouter from "./routes/uploadRoute";
import chatRouter from "./routes/chatRoute";
import messageRouter from "./routes/messageRoute";

app.use(express.static('public'))
app.use('/images', express.static("images"))

if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("db connected"))
    .catch((err) => console.log(err));
} 

app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/chat", chatRouter);
app.use('/message', messageRouter);
app.use("/upload", uploadRouter);

app.listen(8000, () => {
  console.log("server connected at 8000");
});
