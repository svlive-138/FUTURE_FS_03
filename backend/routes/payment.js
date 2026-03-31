import express from 'express';
import Membership from '../models/membership.model.js';
import { createRazorpayOrder, verifyPaymentSignature, getPlanAmount } from '../utils/razorpay.js';
import { sendPaymentConfirmationEmail } from '../utils/email.js';

const router = express.Router();

// POST - Create payment order
router.post('/create-order', async (req, res) => {
  try {
    const { membershipId } = req.body;

    if (!membershipId) {
      return res.status(400).json({ error: 'Membership ID is required' });
    }

    const membership = await Membership.findById(membershipId);
    if (!membership) {
      return res.status(404).json({ error: 'Membership not found' });
    }

    // Create Razorpay order
    const order = await createRazorpayOrder(membership);

    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST - Verify payment
router.post('/verify-payment', async (req, res) => {
  try {
    const { paymentId, orderId, signature, membershipId } = req.body;

    if (!paymentId || !orderId || !signature || !membershipId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Verify signature
    const isValidSignature = verifyPaymentSignature(paymentId, orderId, signature);
    
    if (!isValidSignature) {
      return res.status(400).json({ 
        error: 'Payment verification failed',
        success: false 
      });
    }

    // Update membership as paid
    const membership = await Membership.findByIdAndUpdate(
      membershipId,
      {
        status: 'confirmed',
        paymentStatus: 'paid',
        paymentMethod: 'online',
        paymentDate: new Date(),
      },
      { new: true }
    );

    if (!membership) {
      return res.status(404).json({ error: 'Membership not found' });
    }

    // Send payment confirmation email
    await sendPaymentConfirmationEmail(
      membership.email,
      membership.name,
      membership.plan,
      getPlanAmount(membership.plan)
    );

    res.json({
      success: true,
      message: 'Payment verified successfully',
      membership,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Get order details
router.get('/order/:orderId', async (req, res) => {
  try {
    const razorpay = require('razorpay');
    const instance = new razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await instance.orders.fetch(req.params.orderId);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
