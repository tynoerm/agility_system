import express from 'express';
import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import db from '../config/db.js'; 

const router = express.Router();



// ==========================
// Signup Route (POST /api/signup)
// ==========================
router.post('/', async (req, res) => {
  try {
    const { name, surname, address, phone, password, nextOfKin1 } = req.body;

    // Validate required fields
    if (!name || !surname || !phone || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if phone number already exists
    const [existingUser] = await db.query('SELECT id FROM users WHERE phone = ?', [phone]);
    if (existingUser.length > 0) {
      return res.status(409).json({ message: 'Phone already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user record
    const [result] = await db.query(
      'INSERT INTO users (name, surname, address, phone, password, nextOfKin1) VALUES (?, ?, ?, ?, ?, ?)',
      [name, surname, address, phone, hashedPassword, nextOfKin1]
    );

    // Respond success
    res.status(201).json({
      message: 'User registered successfully',
      userId: result.insertId,
    });

  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
