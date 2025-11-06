import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import pool from '../db.js'; // ✅ Use MySQL connection

const router = express.Router();

// Multer file storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// POST /api/loans
router.post(
  '/',
  upload.fields([
    { name: 'idImage', maxCount: 1 },
    { name: 'selfieImage', maxCount: 1 },
  ]),
  async (req, res) => {
    const { fullName, email, phone, amount, purpose } = req.body;
    const idImagePath = req.files['idImage'] ? req.files['idImage'][0].path : null;
    const selfieImagePath = req.files['selfieImage'] ? req.files['selfieImage'][0].path : null;

    try {
      const [result] = await pool.query(
        `INSERT INTO loans (fullName, email, phone, amount, purpose, idImagePath, selfieImagePath)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [fullName, email, phone, amount, purpose, idImagePath, selfieImagePath]
      );

      res.json({
        success: true,
        message: 'Loan application saved',
        data: { id: result.insertId, fullName, email, phone, amount, purpose, idImagePath, selfieImagePath },
      });
    } catch (err) {
      console.error('Error saving loan:', err);
      res.status(500).json({ success: false, message: 'Database error' });
    }
  }
);

// GET /api/loans
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM loans ORDER BY id DESC');
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error('Error fetching loans:', err);
    res.status(500).json({ success: false, message: 'Database error' });
  }
});

export default router;
