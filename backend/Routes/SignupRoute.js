// routes/signup.js
import express from 'express';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/', async (req, res) => {
  const {
    name,
    surname,
    address,
    phone,
    password,
    nextOfKin1,
    nextOfKin2
  } = req.body;

  if (!name || !surname || !phone || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // get pool from app.locals (server.js attaches it)
    const pool = req.app.locals.db;

    // insert into ONE table
    const [result] = await pool.query(
      `INSERT INTO users
       (name, surname, address, phone, password,
        next_of_kin1_name, next_of_kin1_surname, next_of_kin1_id_number, next_of_kin1_phone,
        next_of_kin2_name, next_of_kin2_surname, next_of_kin2_id_number, next_of_kin2_phone)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        surname,
        address,
        phone,
        hashedPassword,

        nextOfKin1?.name || null,
        nextOfKin1?.surname || null,
        nextOfKin1?.id || null,
        nextOfKin1?.phone || null,

        nextOfKin2?.name || null,
        nextOfKin2?.surname || null,
        nextOfKin2?.id || null,
        nextOfKin2?.phone || null
      ]
    );

    res.json({ message: 'User registered successfully', userId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
