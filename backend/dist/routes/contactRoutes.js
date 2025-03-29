"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contactController_1 = require("../controllers/contactController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Public route for submitting contact form
router.post('/', contactController_1.submitContact);
// Protected routes (admin only)
router.get('/', auth_1.auth, contactController_1.getAllContacts);
router.get('/:id', auth_1.auth, contactController_1.getContactById);
router.patch('/:id/status', auth_1.auth, contactController_1.updateContactStatus);
router.delete('/:id', auth_1.auth, contactController_1.deleteContact);
exports.default = router;
