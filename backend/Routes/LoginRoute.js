import express from 'express';
import bcrypt from 'bcryptjs';
import db from '../config/db.js'; // your MySQL connection file

const router = express.Router();

router.post('/', async (req, res) => {
  const { phone, password } = req.body;

  try {
    // 1️⃣ Find user by phone
    const [rows] = await db.query('SELECT * FROM users WHERE phone = ?', [phone]);
    const user = rows[0];

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid phone or password' });
    }

    // 2️⃣ Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid phone or password' });
    }

    // 3️⃣ Send success response
    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
