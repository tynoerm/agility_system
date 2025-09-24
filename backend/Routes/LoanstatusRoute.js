import express from 'express';
const router = express.Router();


// GET /api/loans – fetch all loan applications
router.get('/', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const [rows] = await db.query('SELECT * FROM loans');
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error('Error fetching loans:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;