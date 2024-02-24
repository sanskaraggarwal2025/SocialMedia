"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const authMiddleware = (req, res, next) => {
    const myHeader = req.headers.authorization;
    if (!myHeader || !myHeader.startsWith("Bearer ")) {
        return res.status(403).send("header issue");
    }
    const token = myHeader.split(" ")[1];
    try {
        let decode = null;
        if (process.env.JWT_SECRET) {
            decode = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        }
        // req.userId = decode?.userId;
        if (!decode) {
            return res.sendStatus(403);
        }
        if (typeof decode === "string") {
            return res.sendStatus(403);
        }
        req.headers["userId"] = decode.userId;
        next();
    }
    catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};
exports.default = authMiddleware;
