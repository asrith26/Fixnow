const express = require('express');
const Payment = require('../models/Payment');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all payments for authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user._id })
      .populate('bookingId', 'service date time')
      .sort({ createdAt: -1 });
    res.json({ payments });
  } catch (error) {
    console.error('Get payments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new payment
router.post('/', auth, async (req, res) => {
  try {
    const { bookingId, amount, paymentMethod, service, location, date, time } = req.body;

    const payment = new Payment({
      user: req.user._id,
      bookingId,
      amount: amount || 125.00,
      paymentMethod: paymentMethod || 'card',
      service,
      location,
      date,
      time
    });

    await payment.save();

    // Populate booking info for response
    await payment.populate('bookingId', 'service date time');

    res.status(201).json({ payment });
  } catch (error) {
    console.error('Create payment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a specific payment
router.get('/:id', auth, async (req, res) => {
  try {
    const payment = await Payment.findOne({ _id: req.params.id, user: req.user._id })
      .populate('bookingId', 'service date time');

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.json({ payment });
  } catch (error) {
    console.error('Get payment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update payment status
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'completed', 'failed', 'refunded'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const payment = await Payment.findOne({ _id: req.params.id, user: req.user._id });

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    payment.status = status;
    await payment.save();

    // Populate booking info for response
    await payment.populate('bookingId', 'service date time');

    res.json({ payment });
  } catch (error) {
    console.error('Update payment status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a payment
router.delete('/:id', auth, async (req, res) => {
  try {
    const payment = await Payment.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.json({ message: 'Payment deleted successfully' });
  } catch (error) {
    console.error('Delete payment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
