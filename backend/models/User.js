import mongoose from 'mongoose';

const nextOfKinSchema = new mongoose.Schema({
  name: String,
  surname: String,
  id: String,
  phone: String
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  address: String,
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nextOfKin: nextOfKinSchema, 
}, { timestamps: true });

export default mongoose.model('User', userSchema);
