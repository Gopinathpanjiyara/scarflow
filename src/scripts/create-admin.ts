import { config } from 'dotenv';
import connectDB from '../lib/mongodb';
import Admin from '../models/Admin';
import { hash } from 'bcryptjs';

config();

async function createAdmin() {
  try {
    await connectDB();

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ mobile: "1234567890" });
    if (existingAdmin) {
      console.log('Admin already exists. Updating password...');
      existingAdmin.password = "admin123"; // Will be hashed by the pre-save hook
      await existingAdmin.save();
      console.log('Admin password updated successfully!');
    } else {
      const adminData = {
        mobile: "1234567890", // Replace with your mobile number
        password: "admin123", // Will be hashed by the pre-save hook
        name: "Admin User",
        isActive: true
      };

      const admin = new Admin(adminData);
      await admin.save();
      console.log('Admin user created successfully!');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

createAdmin(); 