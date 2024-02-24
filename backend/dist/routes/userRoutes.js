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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userModel_1 = __importDefault(require("../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.body;
        const check = yield userModel_1.default.findOne({ username: username });
        if (check) {
            return res.status(403).send("User already exists");
        }
        const newUser = yield userModel_1.default.create({
            username: username,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
        });
        const userId = newUser._id;
        let token = null;
        if (process.env.JWT_SECRET) {
            token = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET, {
                expiresIn: "7d",
            });
        }
        return res.status(200).json({
            msg: "User created",
            token,
            userId: userId,
        });
    }
    catch (err) {
        console.log(err);
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = yield userModel_1.default.findOne({ username: req.body.username });
        if (!check) {
            return res.status(400).send("user does not exist");
        }
        const isUser = yield userModel_1.default.findOne({
            username: req.body.username,
            password: req.body.password,
        });
        if (!isUser) {
            return res.status(400).send("Invalid credentials");
        }
        const userId = isUser._id;
        let token = null;
        if (process.env.JWT_SECRET) {
            token = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET, {
                expiresIn: "7d",
            });
        }
        return res.status(200).json({
            msg: "user logged in",
            token,
            userId: userId
        });
    }
    catch (err) {
        console.log(err);
    }
}));
router.get("/:id", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const user = yield userModel_1.default.findById(id);
        if (!user) {
            return res.status(400).send("No such user");
        }
        const _a = user._doc, { password } = _a, otherDetails = __rest(_a, ["password"]);
        res.status(200).json(otherDetails);
    }
    catch (err) {
        console.log(err);
    }
}));
router.get("/", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let users = yield userModel_1.default.find();
        users = users.map((user) => {
            const _a = user._doc, { password } = _a, otherDetails = __rest(_a, ["password"]);
            return otherDetails;
        });
        return res.status(200).json(users);
    }
    catch (err) {
        console.log(err);
    }
}));
router.put("/:id", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    // const { currentUser, isAdmin } = req.body;
    let userId = req.headers["userId"];
    let currentUser = userId;
    try {
        if (currentUser !== id) {
            //here might be a logic mistake
            return res.status(500).send("Access Denied");
        }
        yield userModel_1.default.findByIdAndUpdate(id, req.body);
        res.status(200).json({
            msg: "user updated successfully",
        });
    }
    catch (err) {
        console.log(err);
    }
}));
router.delete("/:id", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    // const { currentUser, isAdmin } = req.body;
    let userId = req.headers["userId"];
    let currentUser = userId;
    try {
        if (currentUser !== id) {
            return res.status(500).send("Access Denied");
        }
        yield userModel_1.default.findByIdAndDelete(id);
        res.status(200).json("User Deleted Successfully!");
    }
    catch (err) {
        console.log(err);
    }
}));
router.put("/:id/follow", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    // const { currentUserId } = req.body;
    let userId = req.headers["userId"];
    let currentUserId = userId;
    if (id === currentUserId) {
        return res.status(500).send("you cannot follow yourself");
    }
    try {
        const followUser = yield userModel_1.default.findById(id);
        const currentUser = yield userModel_1.default.findById(currentUserId);
        if (followUser === null || followUser === void 0 ? void 0 : followUser.followers.includes(currentUserId)) {
            return res.status(500).send("you already follow this user");
        }
        yield (followUser === null || followUser === void 0 ? void 0 : followUser.updateOne({ $push: { followers: currentUserId } }));
        yield (currentUser === null || currentUser === void 0 ? void 0 : currentUser.updateOne({ $push: { following: id } }));
        return res.status(200).json("User followed!");
    }
    catch (err) {
        console.log(err);
    }
}));
router.put("/:id/unfollow", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    // const { currentUserId } = req.body;
    let userId = req.headers["userId"];
    let currentUserId = userId;
    if (id === currentUserId) {
        return res.status(500).send("You cannot unfollow yourself");
    }
    try {
        const unfollowUser = yield userModel_1.default.findById(id);
        const currentUser = yield userModel_1.default.findById(currentUserId);
        if (!(unfollowUser === null || unfollowUser === void 0 ? void 0 : unfollowUser.followers.includes(currentUserId))) {
            return res.status(403).send("you are not following this id");
        }
        yield (unfollowUser === null || unfollowUser === void 0 ? void 0 : unfollowUser.updateOne({
            $pull: { followers: currentUserId },
        }));
        yield (currentUser === null || currentUser === void 0 ? void 0 : currentUser.updateOne({ $pull: { following: id } }));
        return res.status(200).send("unfollowed successfully");
    }
    catch (err) {
        console.log(err);
    }
}));
exports.default = router;
