import { Request, Response } from 'express';
import { OrganRequest } from '../models/OrganRequest';

// Create new organ request
export const createRequest = async (req: Request, res: Response) => {
  try {
    const request = new OrganRequest(req.body);
    await request.save();
    res.status(201).json({
      message: 'Organ request submitted successfully',
      request
    });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting request', error });
  }
};

// Get all organ requests (admin only)
export const getAllRequests = async (req: Request, res: Response) => {
  try {
    const requests = await OrganRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching requests', error });
  }
};

// Get request by ID
export const getRequestById = async (req: Request, res: Response) => {
  try {
    const request = await OrganRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching request', error });
  }
};

// Update request status (admin only)
export const updateRequestStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const request = await OrganRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: 'Error updating request status', error });
  }
}; 