"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const messageSchema = new mongoose_1.default.Schema({
    chatId: {
        type: String,
    },
    senderId: {
        type: String,
    },
    text: {
        type: String,
    },
}, {
    timestamps: true,
});
const MessageModel = mongoose_1.default.model("MessageModel", messageSchema);
exports.default = MessageModel;
