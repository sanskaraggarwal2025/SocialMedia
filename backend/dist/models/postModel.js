"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const postSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        // type:String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    likes: [],
    image: String,
}, {
    timestamps: true,
});
const Post = mongoose_1.default.model("Post", postSchema);
exports.default = Post;
