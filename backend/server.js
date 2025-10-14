// ======================
// Import Dependencies
// ======================
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

// ======================
// Initialize Express
// ======================
const app = express();
const PORT = process.env.PORT || 5000;

// ======================
// Middleware
// ======================
app.use(cors());
app.use(bodyParser.json());

// ======================
// MongoDB Connection
// ======================
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://tinomutendaishemutemaringa:CVLBrON86Bn8FaLB@cluster0.z2ahbni.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ======================
// Import Routes
// ======================
import SignupRoute from './Routes/SignupRoute.js';
import LoginRoute from './Routes/LoginRoute.js';
import LoanRoute from './Routes/LoanRoute.js';
import LoanstatusRoute from './Routes/LoanstatusRoute.js';
import PaymentRoutes from './Routes/PaymentRoutes.js';

// ======================
// Use Routes
// ======================
app.use('/api/signup', SignupRoute);
app.use('/api/login', LoginRoute);
app.use('/api/loans', LoanRoute);
app.use('/api/getstatusloans', LoanstatusRoute);
app.use('/api/loanstobepaid', PaymentRoutes);

// ======================
// Default Route
// ======================
app.get('/', (req, res) => {
  res.send('✅ Node.js backend running with MongoDB!');
});

// ======================
// Start Server
// ======================
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
