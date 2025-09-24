import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// attach promise-based pool to app.locals
app.locals.db = db.promise();

// Test DB connection
db.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  connection.query('SELECT DATABASE() AS db_name', (err, results) => {
    if (err) console.error(err);
    else console.log(`Connected to MySQL database: ${results[0].db_name}`);
    connection.release();
  });
});

// Import routes
import SignupRoute from './Routes/SignupRoute.js';
import LoginRoute from './Routes/LoginRoute.js';
import LoanRoute from './Routes/LoanRoute.js';
import LoanstatusRoute from './Routes/LoanstatusRoute.js';
import PaymentRoutes from './Routes/PaymentRoutes.js'


app.use('/api/signup', SignupRoute);
app.use('/api/login', LoginRoute);
app.use('/api/loans', LoanRoute);
app.use('/api/getstatusloans', LoanstatusRoute);
app.use('/api/loanstobepaid', PaymentRoutes);



// Test route
app.get('/', (req, res) => {
  res.send('Hello from Node.js backend!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
