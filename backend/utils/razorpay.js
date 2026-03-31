import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Razorpay only if credentials are provided
let razorpay = null;

(async () => {
  if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    try {
      const { default: Razorpay } = await import('razorpay');
      razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });
      console.log('✓ Razorpay initialized successfully');
    } catch (error) {
      console.warn('⚠ Razorpay initialization failed:', error.message);
      razorpay = null;
    }
  } else {
    console.warn('⚠ Razorpay credentials not provided. Payment features will be disabled.');
  }
})();

// Create Razorpay order
export const createRazorpayOrder = async (membership) => {
  if (!razorpay) {
    throw new Error('Razorpay is not configured. Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to your .env file.');
  }
  
  try {
    const options = {
      amount: getPlanAmount(membership.plan) * 100, // Amount in paise
      currency: 'INR',
      receipt: `receipt_${membership._id}`,
      description: `I Gym ${membership.plan.toUpperCase()} Membership - ${membership.name}`,
      customer_notify: 1,
      notes: {
        membershipId: membership._id,
        name: membership.name,
        email: membership.email,
        plan: membership.plan,
      },
    };

    const order = await razorpay.orders.create(options);
    return order;
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw new Error('Failed to create payment order');
  }
};

// Verify Razorpay payment signature
export const verifyPaymentSignature = (paymentId, orderId, signature) => {
  if (!process.env.RAZORPAY_KEY_SECRET) {
    console.error('Razorpay key secret not configured');
    return false;
  }
  
  try {
    const body = orderId + '|' + paymentId;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    return expectedSignature === signature;
  } catch (error) {
    console.error('Error verifying signature:', error);
    return false;
  }
};

// Get plan amount (in INR)
export const getPlanAmount = (plan) => {
  const prices = {
    monthly: 1499,
    quarterly: 3999,
    yearly: 9999,
  };
  return prices[plan] || 1499;
};

export default razorpay;
