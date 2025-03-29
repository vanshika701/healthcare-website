import express, { Router } from 'express';
import { createRequest, getAllRequests, getRequestById, updateRequestStatus } from '../controllers/organRequestController';
import { auth } from '../middleware/auth';

const router: Router = express.Router();

// Public route
router.post('/', createRequest as express.RequestHandler);

// Protected routes (admin only)
router.get('/', auth as express.RequestHandler, getAllRequests as express.RequestHandler);
router.get('/:id', auth as express.RequestHandler, getRequestById as express.RequestHandler);
router.patch('/:id/status', auth as express.RequestHandler, updateRequestStatus as express.RequestHandler);

export default router; 