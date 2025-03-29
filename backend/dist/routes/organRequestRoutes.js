"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const organRequestController_1 = require("../controllers/organRequestController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Public route
router.post('/', organRequestController_1.createRequest);
// Protected routes (admin only)
router.get('/', auth_1.auth, organRequestController_1.getAllRequests);
router.get('/:id', auth_1.auth, organRequestController_1.getRequestById);
router.patch('/:id/status', auth_1.auth, organRequestController_1.updateRequestStatus);
exports.default = router;
