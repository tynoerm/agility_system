import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Loan from '../models/Loan.js';

const router = express.Router();

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

router.post('/', upload.fields([
  { name: 'idImage', maxCount: 1 },
  { name: 'selfieImage', maxCount: 1 },
]), async (req, res) => {
  const { fullName, email, phone, amount, purpose } = req.body;
  const idImagePath = req.files['idImage'] ? req.files['idImage'][0].path : null;
  const selfieImagePath = req.files['selfieImage'] ? req.files['selfieImage'][0].path : null;

  try {
    const loan = new Loan({ fullName, email, phone, amount, purpose, idImagePath, selfieImagePath });
    const saved = await loan.save();
    res.json({ success: true, message: 'Loan application saved', data: saved });
  } catch (err) {
    console.error('Error saving loan:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const loans = await Loan.find();
    res.json({ success: true, data: loans });
  } catch (err) {
    console.error('Error fetching loans:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
