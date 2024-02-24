"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const uploadRoute_1 = __importDefault(require("./routes/uploadRoute"));
const chatRoute_1 = __importDefault(require("./routes/chatRoute"));
const messageRoute_1 = __importDefault(require("./routes/messageRoute"));
app.use(express_1.default.static('public'));
app.use('/images', express_1.default.static("images"));
if (process.env.MONGO_URI) {
    mongoose_1.default
        .connect(process.env.MONGO_URI)
        .then(() => console.log("db connected"))
        .catch((err) => console.log(err));
}
app.use("/user", userRoutes_1.default);
app.use("/post", postRoutes_1.default);
app.use("/chat", chatRoute_1.default);
app.use('/message', messageRoute_1.default);
app.use("/upload", uploadRoute_1.default);
app.listen(8000, () => {
    console.log("server connected at 8000");
});
