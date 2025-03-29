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
exports.getDonorsByOrgan = exports.getDonorsByBloodGroup = exports.updateDonorStatus = exports.getDonorById = exports.getAllDonors = exports.registerDonor = void 0;
const OrganDonor_1 = __importDefault(require("../models/OrganDonor"));
// Register new organ donor
const registerDonor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Received donor data:', JSON.stringify(req.body, null, 2)); // Debug log
        // Validate required fields
        const requiredFields = ['name', 'age', 'gender', 'bloodGroup', 'organsToDonate', 'contactNumber', 'email', 'location'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            console.log('Missing required fields:', missingFields); // Debug log
            return res.status(400).json({
                success: false,
                message: `Missing required fields: ${missingFields.join(', ')}`
            });
        }
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(req.body.email)) {
            console.log('Invalid email format:', req.body.email); // Debug log
            return res.status(400).json({
                success: false,
                message: 'Please enter a valid email address'
            });
        }
        // Validate organs array
        if (!Array.isArray(req.body.organsToDonate) || req.body.organsToDonate.length === 0) {
            console.log('Invalid organs array:', req.body.organsToDonate); // Debug log
            return res.status(400).json({
                success: false,
                message: 'At least one organ must be selected'
            });
        }
        // Check if donor with same email already exists
        const existingDonor = yield OrganDonor_1.default.findOne({ email: req.body.email });
        if (existingDonor) {
            console.log('Donor with email already exists:', req.body.email); // Debug log
            return res.status(400).json({
                success: false,
                message: 'A donor with this email already exists'
            });
        }
        // Create donor with validated data
        const donorData = {
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender,
            bloodGroup: req.body.bloodGroup,
            organsToDonate: req.body.organsToDonate,
            contactNumber: req.body.contactNumber,
            email: req.body.email,
            location: req.body.location,
            message: req.body.message || '',
            medicalHistory: req.body.medicalHistory || '',
            status: 'pending' // Set initial status
        };
        console.log('Creating donor with data:', JSON.stringify(donorData, null, 2)); // Debug log
        const donor = new OrganDonor_1.default(donorData);
        console.log('Saving donor to database...'); // Debug log
        const savedDonor = yield donor.save();
        console.log('Saved donor to database:', JSON.stringify(savedDonor, null, 2)); // Debug log
        res.status(201).json({
            success: true,
            message: 'Organ donor registration submitted successfully',
            data: savedDonor
        });
    }
    catch (error) {
        console.error('Error in registerDonor:', error); // Debug log
        if (error instanceof Error) {
            console.error('Error details:', {
                name: error.name,
                message: error.message,
                stack: error.stack
            });
        }
        res.status(500).json({
            success: false,
            message: 'Error submitting donor registration',
            error: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.message : 'Unknown error' : undefined
        });
    }
});
exports.registerDonor = registerDonor;
// Get all organ donors (admin only)
const getAllDonors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const donors = yield OrganDonor_1.default.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: donors
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching donors',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
exports.getAllDonors = getAllDonors;
// Get donor by ID
const getDonorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const donor = yield OrganDonor_1.default.findById(req.params.id);
        if (!donor) {
            return res.status(404).json({
                success: false,
                message: 'Donor not found'
            });
        }
        res.status(200).json({
            success: true,
            data: donor
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching donor',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
exports.getDonorById = getDonorById;
// Update donor status (admin only)
const updateDonorStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        const donor = yield OrganDonor_1.default.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
        if (!donor) {
            return res.status(404).json({
                success: false,
                message: 'Donor not found'
            });
        }
        res.status(200).json({
            success: true,
            data: donor
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating donor status',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
exports.updateDonorStatus = updateDonorStatus;
// Get donors by blood group
const getDonorsByBloodGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const donors = yield OrganDonor_1.default.find({
            bloodGroup: req.params.bloodGroup,
            status: 'active'
        });
        res.status(200).json({
            success: true,
            data: donors
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching donors by blood group',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
exports.getDonorsByBloodGroup = getDonorsByBloodGroup;
// Get donors by organ
const getDonorsByOrgan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const donors = yield OrganDonor_1.default.find({
            organsToDonate: req.params.organ,
            status: 'active'
        });
        res.status(200).json({
            success: true,
            data: donors
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching donors by organ',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
exports.getDonorsByOrgan = getDonorsByOrgan;
