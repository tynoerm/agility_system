// ======================
// Import Dependencies
// ======================
import express from 'express';
import mysql from 'mysql2/promise';
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
// MySQL Connection
// ======================
const db = await mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'loan_app_db',
});

try {
  await db.connect();
  console.log('✅ Connected to MySQL Database');
} catch (err) {
  console.error('❌ MySQL connection error:', err);
}

// Make DB available to all routes
app.use((req, res, next) => {
  req.db = db;
  next();
});

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
  res.send('✅ Node.js backend running with MySQL!');
});

// ======================
// Start Server
// ======================
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default db;
