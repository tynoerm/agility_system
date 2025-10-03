import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// --- configure storage for multer ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // create uploads folder if not exist
    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // e.g. idImage-16635454545.jpg
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// accept two files with keys 'idImage' and 'selfieImage'
const upload = multer({ storage: storage });

/**
 * POST /api/loans
 * Fields: fullName, email, phone, amount, purpose
 * Files: idImage, selfieImage
 */
router.post('/', upload.fields([
  { name: 'idImage', maxCount: 1 },
  { name: 'selfieImage', maxCount: 1 },
]), async (req, res) => {
  const { fullName, email, phone, amount, purpose } = req.body;

  if (!fullName || !email || !phone || !amount || !purpose) {
    return res
      .status(400)
      .json({ success: false, message: 'All fields are required.' });
  }

  // paths to files if uploaded
  const idImagePath = req.files['idImage'] ? req.files['idImage'][0].path : null;
  const selfieImagePath = req.files['selfieImage'] ? req.files['selfieImage'][0].path : null;

  try {
    const db = req.app.locals.db;
    // include the paths in your DB table (make sure you added these columns)
    await db.query(
      'INSERT INTO loans (fullName, email, phone, amount, purpose, idImagePath, selfieImagePath) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [fullName, email, phone, amount, purpose, idImagePath, selfieImagePath]
    );

    res.status(201).json({
      success: true,
      message: 'Loan application submitted successfully!',
      data: {
        fullName,
        email,
        phone,
        amount,
        purpose,
        idImagePath,
        selfieImagePath,
      },
    });
  } catch (err) {
    console.error('Error saving loan application:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
