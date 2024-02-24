"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const postModel_1 = __importDefault(require("../models/postModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
//create a post
router.post("/", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers["userId"];
    const { desc, image } = req.body;
    try {
        const newPost = yield postModel_1.default.create({
            userId: userId,
            desc: desc,
            image: image,
        });
        if (!newPost) {
            return res.status(500).send("post cannot be created");
        }
        return res.status(200).json({
            msg: "post created successfully",
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
}));
// get a post
router.get("/:id", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const post = yield postModel_1.default.findById(id);
        if (!post) {
            return res.status(500).send("cannot get the image");
        }
        return res.status(200).send({
            msg: post,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
}));
//update a post
router.put("/:id", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers["userId"];
    const postId = req.params.id;
    // const userId = req.userId;
    try {
        const post = yield postModel_1.default.findById(postId);
        let psid = post === null || post === void 0 ? void 0 : post.userId;
        let psidValue = psid === null || psid === void 0 ? void 0 : psid.valueOf();
        if (psidValue !== userId) {
            return res.status(500).send("access denied");
        }
        yield (post === null || post === void 0 ? void 0 : post.updateOne({ $set: req.body }));
        return res.status(500).send("post updated");
    }
    catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
}));
//delete a post
router.delete("/:id", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.id;
    const userId = req.headers["userId"];
    try {
        const post = yield postModel_1.default.findById(postId);
        if ((post === null || post === void 0 ? void 0 : post.userId) !== userId) {
            return res.status(500).send("access denied");
        }
        yield postModel_1.default.findByIdAndDelete(postId);
        return res.status(500).send("post updated");
    }
    catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
}));
// like/dislike a post
router.put("/:id/like", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.id;
    // const userId = req.userId;
    const userId = req.headers["userId"];
    try {
        const post = yield postModel_1.default.findById(postId);
        if (post === null || post === void 0 ? void 0 : post.likes.includes(userId)) {
            yield post.updateOne({ $pull: { likes: userId } });
            return res.status(200).send("Post Disliked");
        }
        yield (post === null || post === void 0 ? void 0 : post.updateOne({ $push: { likes: userId } }));
        return res.status(500).send("Post Liked");
    }
    catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
}));
//timeline route 
router.get('/:id/timeline', authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const currentUserPosts = yield postModel_1.default.find({ userId: userId });
        const followingPosts = yield userModel_1.default.aggregate([
            {
                $match: {
                    _id: new mongoose_1.default.Types.ObjectId(userId),
                },
            },
            {
                $lookup: {
                    from: "posts",
                    localField: "following",
                    foreignField: "userId",
                    as: "followingPosts",
                },
            },
            {
                $project: {
                    followingPosts: 1,
                    _id: 0
                },
            },
        ]);
        res.status(200).json(currentUserPosts
            .concat(...followingPosts[0].followingPosts)
            .sort((a, b) => {
            return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
        }));
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}));
exports.default = router;
