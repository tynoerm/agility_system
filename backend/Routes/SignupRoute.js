import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, surname, address, phone, password, nextOfKin1, nextOfKin2 } = req.body;

    if (!name || !surname || !phone || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(409).json({ message: 'Phone already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      surname,
      address,
      phone,
      password: hashedPassword,
      nextOfKin1,
      nextOfKin2
    });

    const savedUser = await newUser.save();
    res.json({ message: 'User registered successfully', userId: savedUser._id });

  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
