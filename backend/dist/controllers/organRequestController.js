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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRequestStatus = exports.getRequestById = exports.getAllRequests = exports.createRequest = void 0;
const OrganRequest_1 = require("../models/OrganRequest");
// Create new organ request
const createRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = new OrganRequest_1.OrganRequest(req.body);
        yield request.save();
        res.status(201).json({
            message: 'Organ request submitted successfully',
            request
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error submitting request', error });
    }
});
exports.createRequest = createRequest;
// Get all organ requests (admin only)
const getAllRequests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requests = yield OrganRequest_1.OrganRequest.find().sort({ createdAt: -1 });
        res.json(requests);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching requests', error });
    }
});
exports.getAllRequests = getAllRequests;
// Get request by ID
const getRequestById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield OrganRequest_1.OrganRequest.findById(req.params.id);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.json(request);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching request', error });
    }
});
exports.getRequestById = getRequestById;
// Update request status (admin only)
const updateRequestStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        const request = yield OrganRequest_1.OrganRequest.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.json(request);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating request status', error });
    }
});
exports.updateRequestStatus = updateRequestStatus;
