"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
router.post('/', upload.single("file"), (req, res) => {
    try {
        return res.status(200).send('file uploaded successfully');
    }
    catch (err) {
        console.log(err);
    }
});
exports.default = router;
