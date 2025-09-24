import express from 'express';
const router = express.Router();

// POST /api/loans – Submit a new loan application
router.post('/', async (req, res) => {
  const { fullName, email, phone, amount, purpose } = req.body;

  if (!fullName || !email || !phone || !amount || !purpose) {
    return res
      .status(400)
      .json({ success: false, message: 'All fields are required.' });
  }

  try {
    const db = req.app.locals.db;
    await db.query(
      'INSERT INTO loans (fullName, email, phone, amount, purpose) VALUES (?, ?, ?, ?, ?)',
      [fullName, email, phone, amount, purpose]
    );

    res.status(201).json({
      success: true,
      message: 'Loan application submitted successfully!',
      data: { fullName, email, phone, amount, purpose },
    });
  } catch (err) {
    console.error('Error saving loan application:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});



export default router;
