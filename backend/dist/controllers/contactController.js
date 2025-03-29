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
exports.deleteContact = exports.updateContactStatus = exports.getContactById = exports.getAllContacts = exports.submitContact = void 0;
const Contact_1 = __importDefault(require("../models/Contact"));
const submitContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, subject, message } = req.body;
        const contact = new Contact_1.default({
            name,
            email,
            subject,
            message,
        });
        yield contact.save();
        res.status(201).json({
            success: true,
            message: 'Contact form submitted successfully',
            data: contact,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error submitting contact form',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.submitContact = submitContact;
const getAllContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contacts = yield Contact_1.default.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: contacts,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching contacts',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.getAllContacts = getAllContacts;
const getContactById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contact = yield Contact_1.default.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found',
            });
        }
        res.status(200).json({
            success: true,
            data: contact,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching contact',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.getContactById = getContactById;
const updateContactStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        const contact = yield Contact_1.default.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found',
            });
        }
        res.status(200).json({
            success: true,
            data: contact,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating contact status',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.updateContactStatus = updateContactStatus;
const deleteContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contact = yield Contact_1.default.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Contact deleted successfully',
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting contact',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.deleteContact = deleteContact;
