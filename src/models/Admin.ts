import mongoose from 'mongoose';
import { hash, compare } from 'bcryptjs';

interface IAdmin extends mongoose.Document {
  mobile: string;
  password: string;
  name: string;
  isActive: boolean;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const adminSchema = new mongoose.Schema({
  mobile: {
    type: String,
    required: [true, 'Mobile number is required'],
    unique: true,
    validate: {
      validator: function(v: string) {
        return /^\d{10}$/.test(v);
      },
      message: props => `${props.value} is not a valid mobile number!`
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Hash password before saving
adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    this.password = await hash(this.password, 12);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Method to check password
adminSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    return await compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};

const Admin = mongoose.models.Admin as mongoose.Model<IAdmin> || mongoose.model<IAdmin>('Admin', adminSchema);

export default Admin; 