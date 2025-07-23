import mongoose from 'mongoose';

interface IApplication {
  isInternship: boolean;
}

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  resumeUrl: {
    type: String,
    required: true,
  },
  profileImageUrl: {
    type: String,
    required: false,
  },
  university: {
    type: String,
    required: function(this: IApplication) {
      return this.isInternship;
    },
    trim: true,
  },
  linkedinProfile: String,
  coverLetter: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'reviewing', 'accepted', 'rejected'],
    default: 'pending',
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const Application = mongoose.models.Application || mongoose.model('Application', applicationSchema);

export default Application; 