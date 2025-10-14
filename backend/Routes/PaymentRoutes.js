import express from 'express';
import { Paynow } from 'paynow';
import Transaction from '../models/Transaction.js';
import Loan from '../models/Loan.js';

const router = express.Router();

function formatPhoneNumber(phone) {
  let p = phone.toString().trim();
  if (p.startsWith('0')) p = '+263' + p.slice(1);
  if (!p.startsWith('+263')) p = '+263' + p;
  return p;
}

const paynow = new Paynow('22028', '99335ca4-e96a-4d5a-91c8-59f0bc7e947b');

router.get('/', async (req, res) => {
  try {
    const loans = await Loan.find({}, 'amount _id');
    res.json(loans);
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ message: 'DB error', error: err });
  }
});

router.post('/payments', async (req, res) => {
  const { loanId, amount, phone, paymentMethod } = req.body;

  try {
    const formattedPhone = formatPhoneNumber(phone);
    const payment = paynow.createPayment(`Loan-${loanId}`, 'tinomutendamutemaringa@gmail.com');
    payment.add(`Loan repayment ${loanId}`, Number(amount));
    payment.resultUrl = 'http://192.168.3.43:5000/api/loanstobepaid/payments/status';
    payment.returnUrl = 'http://192.168.3.43:5000/thankyou';

    const result = await paynow.sendMobile(payment, formattedPhone, paymentMethod.toLowerCase());

    if (result.success) {
      const transaction = new Transaction({
        loanId,
        phone: formattedPhone,
        amount,
        method: paymentMethod,
        pollUrl: result.pollUrl,
      });
      await transaction.save();
      res.json({ success: true, message: 'Payment initiated', pollUrl: result.pollUrl });
    } else {
      res.status(400).json({ success: false, message: result.error });
    }
  } catch (err) {
    console.error('Payment error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.get('/payments/status', async (req, res) => {
  const { pollUrl } = req.query;
  if (!pollUrl) return res.status(400).json({ success: false, message: 'pollUrl required' });

  try {
    const status = await paynow.pollTransaction(pollUrl);
    await Transaction.findOneAndUpdate({ pollUrl }, { status: status.status });
    res.json(status);
  } catch (err) {
    console.error('Poll error:', err);
    res.status(500).json({ success: false, message: 'Error polling status' });
  }
});

export default router;
