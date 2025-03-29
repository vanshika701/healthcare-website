import express, { Router } from 'express';
import {
  submitContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
} from '../controllers/contactController';
import { auth } from '../middleware/auth';

const router: Router = express.Router();

// Public route for submitting contact form
router.post('/', submitContact as express.RequestHandler);

// Protected routes (admin only)
router.get('/', auth as express.RequestHandler, getAllContacts as express.RequestHandler);
router.get('/:id', auth as express.RequestHandler, getContactById as express.RequestHandler);
router.patch('/:id/status', auth as express.RequestHandler, updateContactStatus as express.RequestHandler);
router.delete('/:id', auth as express.RequestHandler, deleteContact as express.RequestHandler);

export default router; 