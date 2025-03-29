"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const organDonorController_1 = require("../controllers/organDonorController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Public route
router.post('/', organDonorController_1.registerDonor);
// Protected routes (admin only)
router.get('/', auth_1.auth, organDonorController_1.getAllDonors);
router.get('/:id', auth_1.auth, organDonorController_1.getDonorById);
router.patch('/:id/status', auth_1.auth, organDonorController_1.updateDonorStatus);
// Search routes
router.get('/blood-group/:bloodGroup', organDonorController_1.getDonorsByBloodGroup);
router.get('/organ/:organ', organDonorController_1.getDonorsByOrgan);
exports.default = router;
