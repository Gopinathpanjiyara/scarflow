import mongoose from 'mongoose';

interface IJob {
  isInternship: boolean;
}

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  company: {
    type: String,
    required: [true, 'Company is required'],
    trim: true,
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
  },
  type: {
    type: String,
    required: [true, 'Type is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  tags: [{
    type: String,
    trim: true,
  }],
  isInternship: {
    type: Boolean,
    default: false,
  },
  duration: {
    type: String,
    required: function(this: IJob) { 
      return this.isInternship;
    },
    trim: true,
  },
  salary: {
    type: String,
    required: function(this: IJob) { 
      return !this.isInternship;
    },
    trim: true,
  },
  compensation: {
    type: String,
    required: function(this: IJob) { 
      return this.isInternship;
    },
    trim: true,
  },
  responsibilities: [{
    type: String,
    required: [true, 'At least one responsibility is required'],
  }],
  requirements: [{
    type: String,
    required: [true, 'At least one requirement is required'],
  }],
  benefits: [{
    type: String,
    required: [true, 'At least one benefit is required'],
  }],
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Handle the case where the model might already be compiled
const Job = mongoose.models.Job || mongoose.model('Job', jobSchema);

export default Job; 