import express, { Router } from 'express';
import { 
  registerDonor, 
  getAllDonors, 
  getDonorById, 
  updateDonorStatus,
  getDonorsByBloodGroup,
  getDonorsByOrgan
} from '../controllers/organDonorController';
import { auth } from '../middleware/auth';

const router: Router = express.Router();

// Public route
router.post('/', registerDonor as express.RequestHandler);

// Protected routes (admin only)
router.get('/', auth as express.RequestHandler, getAllDonors as express.RequestHandler);
router.get('/:id', auth as express.RequestHandler, getDonorById as express.RequestHandler);
router.patch('/:id/status', auth as express.RequestHandler, updateDonorStatus as express.RequestHandler);

// Search routes
router.get('/blood-group/:bloodGroup', getDonorsByBloodGroup as express.RequestHandler);
router.get('/organ/:organ', getDonorsByOrgan as express.RequestHandler);

export default router; 