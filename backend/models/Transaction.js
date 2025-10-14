import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  loanId: { type: mongoose.Schema.Types.ObjectId, ref: 'Loan' },
  phone: String,
  amount: Number,
  method: String,
  status: { type: String, default: 'Pending' },
  pollUrl: String,
}, { timestamps: true });

export default mongoose.model('Transaction', transactionSchema);
