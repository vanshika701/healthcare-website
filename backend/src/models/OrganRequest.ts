import mongoose, { Document, Schema } from 'mongoose';

export interface IOrganRequest extends Document {
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  organNeeded: string;
  urgency: 'normal' | 'urgent' | 'emergency';
  contactNumber: string;
  email: string;
  location: string;
  message?: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

const organRequestSchema = new Schema<IOrganRequest>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: 0
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['male', 'female', 'other']
  },
  bloodGroup: {
    type: String,
    required: [true, 'Blood group is required'],
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
  },
  organNeeded: {
    type: String,
    required: [true, 'Organ needed is required'],
    enum: ['heart', 'liver', 'kidney', 'lungs', 'pancreas', 'intestines']
  },
  urgency: {
    type: String,
    required: [true, 'Urgency level is required'],
    enum: ['normal', 'urgent', 'emergency'],
    default: 'normal'
  },
  contactNumber: {
    type: String,
    required: [true, 'Contact number is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  message: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'completed'],
    default: 'pending'
  }
}, {
  timestamps: true
});

export const OrganRequest = mongoose.model<IOrganRequest>('OrganRequest', organRequestSchema); 