import express, { Router } from 'express';
import { register, login, getProfile, updateProfile } from '../controllers/userController';
import { auth } from '../middleware/auth';

const router: Router = express.Router();

// Public routes
router.post('/register', register as express.RequestHandler);
router.post('/login', login as express.RequestHandler);

// Protected routes
router.get('/profile/:id', auth as express.RequestHandler, getProfile as express.RequestHandler);
router.patch('/profile/:id', auth as express.RequestHandler, updateProfile as express.RequestHandler);

export default router; 