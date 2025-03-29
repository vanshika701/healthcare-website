"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Public routes
router.post('/register', userController_1.register);
router.post('/login', userController_1.login);
// Protected routes
router.get('/profile/:id', auth_1.auth, userController_1.getProfile);
router.patch('/profile/:id', auth_1.auth, userController_1.updateProfile);
exports.default = router;
