import mongoose from 'mongoose';

const loanSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  amount: Number,
  purpose: String,
  idImagePath: String,
  selfieImagePath: String,
  status: { type: String, default: 'Pending' }
}, { timestamps: true });

export default mongoose.model('Loan', loanSchema);
