import mongoose, { Document, Schema } from 'mongoose';

export interface IOrganDonor extends Document {
  name: string;
  age: string;
  gender: string;
  bloodGroup: string;
  organsToDonate: string[];
  contactNumber: string;
  email: string;
  location: string;
  message?: string;
  status: 'pending' | 'approved' | 'rejected' | 'active';
  medicalHistory?: string;
  createdAt: Date;
  updatedAt: Date;
}

const organDonorSchema = new Schema<IOrganDonor>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  age: {
    type: String,
    required: [true, 'Age is required']
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
  organsToDonate: [{
    type: String,
    required: [true, 'At least one organ must be selected'],
    enum: ['Heart', 'Lungs', 'Liver', 'Kidneys', 'Pancreas', 'Intestines', 'Eyes', 'Skin', 'Bone Marrow']
  }],
  contactNumber: {
    type: String,
    required: [true, 'Contact number is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
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
  medicalHistory: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'active'],
    default: 'pending'
  }
}, {
  timestamps: true
});

export default mongoose.model<IOrganDonor>('OrganDonor', organDonorSchema); 