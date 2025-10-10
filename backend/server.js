// ======================
// Import Dependencies
// ======================
import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';

// ======================
// Initialize Express
// ======================
const app = express();
const PORT = 5000; // You can change this if needed

// ======================
// Middleware
// ======================
app.use(cors());
app.use(bodyParser.json());

// ======================
// MySQL Connection Pool (Direct Credentials)
// ======================
const db = mysql.createPool({
  host: '192.138.189.160',
  user: 'bluebaby_bluebaby',
  password: 'microfinance2025',
  database: 'bluebaby_agility_finance',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Attach promise-based pool
app.locals.db = db.promise();

// ======================
// Test Database Connection
// ======================
db.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
    return;
  }
  connection.query('SELECT DATABASE() AS db_name', (err, results) => {
    if (err) console.error('❌ Query failed:', err.message);
    else console.log(`✅ Connected to MySQL database: ${results[0].db_name}`);
    connection.release();
  });
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
  res.send('✅ Node.js backend running successfully!');
});

app.get('/api/test-db', async (req, res) => {
  try {
    const [rows] = await app.locals.db.query('SELECT NOW() AS current_time');
    res.json({
      success: true,
      message: 'Database connection successful!',
      current_time: rows[0].current_time
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});


app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

