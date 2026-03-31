import { useState, useEffect } from 'react';
import { Check, X, CreditCard, Loader } from 'lucide-react';
import axios from 'axios';

const Membership = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', plan: 'monthly' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [membershipId, setMembershipId] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const plans = [
    {
      name: 'Monthly',
      price: '₹1,499',
      period: 'per month',
      featured: false,
      features: [
        { name: 'Access to all facilities', included: true },
        { name: '24/7 Access', included: true },
        { name: 'Basic equipment', included: true },
        { name: 'Group classes', included: false },
        { name: 'Personal trainer', included: false },
        { name: 'Diet consultation', included: false },
        { name: 'Free trial period', included: true },
      ]
    },
    {
      name: 'Quarterly',
      price: '₹3,999',
      period: 'per 3 months',
      featured: true,
      features: [
        { name: 'Access to all facilities', included: true },
        { name: '24/7 Access', included: true },
        { name: 'All equipment access', included: true },
        { name: 'Unlimited group classes', included: true },
        { name: '4 sessions personal trainer', included: true },
        { name: 'Diet consultation', included: false },
        { name: 'Free trial period', included: true },
      ]
    },
    {
      name: 'Yearly',
      price: '₹9,999',
      period: 'per year',
      featured: false,
      features: [
        { name: 'Access to all facilities', included: true },
        { name: '24/7 Access', included: true },
        { name: 'All equipment access', included: true },
        { name: 'Unlimited group classes', included: true },
        { name: '12 sessions personal trainer', included: true },
        { name: 'Monthly diet consultation', included: true },
        { name: '1 month free trial', included: true },
      ]
    },
  ];

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post(`${API_URL}/membership`, formData);
      const createdMembership = response.data.contact || response.data.membership;
      if (createdMembership) {
        setMembershipId(createdMembership._id);
        setMessage('✅ Membership created! Proceed to payment.');
        setShowPaymentForm(true);
      }
    } catch (error) {
      setMessage('❌ ' + (error.response?.data?.error || error.message || 'Error creating membership'));
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!membershipId) {
      setMessage('❌ Please fill the form first');
      return;
    }

    setPaymentStatus('processing');

    try {
      const orderResponse = await axios.post(`${API_URL}/payment/create-order`, {
        membershipId,
      });

      if (!orderResponse.data.success) {
        throw new Error('Failed to create order');
      }

      const { orderId, amount, keyId } = orderResponse.data;

      const options = {
        key: keyId,
        amount: amount,
        currency: 'INR',
        order_id: orderId,
        name: 'I Gym',
        description: `${formData.plan.toUpperCase()} Membership`,
        image: '💪',
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#f97316',
        },
        handler: async (response) => {
          try {
            const verifyResponse = await axios.post(`${API_URL}/payment/verify-payment`, {
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
              membershipId,
            });

            if (verifyResponse.data.success) {
              setPaymentStatus('success');
              setMessage('🎉 Payment successful! Your membership is now active!');
              setShowPaymentForm(false);
              setFormData({ name: '', email: '', phone: '', plan: 'monthly' });
              setMembershipId(null);
            } else {
              setPaymentStatus('failed');
              setMessage('❌ Payment verification failed');
            }
          } catch (error) {
            setPaymentStatus('failed');
            setMessage('❌ ' + (error.response?.data?.error || 'Payment verification failed'));
          }
        },
        modal: {
          ondismiss: () => {
            setPaymentStatus('');
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      setPaymentStatus('failed');
      setMessage('❌ ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="bg-slate-950">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-950 via-orange-900 to-slate-950 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="section-title">Membership Plans</h1>
          <p className="section-subtitle max-w-3xl mx-auto">
            Choose the perfect plan for your fitness journey. Secure online payment with Razorpay.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`card relative transition-all duration-300 ${
                  plan.featured ? 'md:scale-105 border-orange-500 shadow-2xl shadow-orange-500/20' : ''
                }`}
              >
                {plan.featured && (
                  <div className="absolute top-0 right-0 bg-orange-500 text-white px-4 py-1 rounded-bl-lg text-sm font-bold">
                    POPULAR
                  </div>
                )}

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-orange-500">
                      {plan.price}
                    </span>
                    <p className="text-gray-400 text-sm mt-2">{plan.period}</p>
                  </div>

                  <button className="btn-primary w-full mb-8">Select Plan</button>

                  <div className="space-y-4">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={feature.included ? 'text-gray-300' : 'text-gray-600'}>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Detailed Comparison</h2>
            <div className="card p-8 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-4 text-white font-bold">Feature</th>
                    <th className="text-center py-4 text-white font-bold">Monthly</th>
                    <th className="text-center py-4 text-white font-bold">Quarterly</th>
                    <th className="text-center py-4 text-white font-bold">Yearly</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Facility Access', prices: [true, true, true] },
                    { feature: '24/7 Access', prices: [true, true, true] },
                    { feature: 'All Equipment', prices: [true, true, true] },
                    { feature: 'Group Classes', prices: [false, true, true] },
                    { feature: 'Personal Training', prices: [0, 4, 12] },
                    { feature: 'Diet Consultation', prices: [false, false, true] },
                  ].map((row, idx) => (
                    <tr key={idx} className="border-b border-slate-800 hover:bg-slate-900">
                      <td className="py-4 text-gray-300 font-medium">{row.feature}</td>
                      {row.prices.map((price, pidx) => (
                        <td key={pidx} className="text-center py-4">
                          {typeof price === 'boolean' ? (
                            price ? <Check className="w-5 h-5 text-orange-500 mx-auto" /> : <X className="w-5 h-5 text-gray-600 mx-auto" />
                          ) : typeof price === 'number' ? (
                            <span className="text-gray-300">{price}</span>
                          ) : (
                            <span className="text-gray-300">{price}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Form & Payment */}
      <section className="py-16 md:py-24 bg-slate-900 border-t border-slate-800">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            {showPaymentForm ? '💳 Complete Payment' : '📝 Join I Gym'}
          </h2>

          {!showPaymentForm ? (
            <div className="card p-8 md:p-12">
              <p className="text-gray-400 mb-8">Fill in your details to get started.</p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="+91 9876543210"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Select Plan</label>
                  <select
                    name="plan"
                    value={formData.plan}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="monthly">Monthly - ₹1,499</option>
                    <option value="quarterly">Quarterly - ₹3,999</option>
                    <option value="yearly">Yearly - ₹9,999</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-3 text-lg disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Continue to Payment'}
                </button>

                {message && (
                  <p className={`text-center p-4 rounded ${message.includes('✅') ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                    {message}
                  </p>
                )}
              </form>
            </div>
          ) : (
            <div className="card p-8 space-y-6">
              <div className="bg-slate-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-white mb-4">Order Summary</h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex justify-between">
                    <span>Name:</span>
                    <span className="text-white font-semibold">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Email:</span>
                    <span className="text-white font-semibold">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phone:</span>
                    <span className="text-white font-semibold">{formData.phone}</span>
                  </div>
                  <div className="border-t border-slate-700 pt-3 mt-3 flex justify-between">
                    <span className="font-semibold">Plan:</span>
                    <span className="text-orange-500 font-bold">
                      {formData.plan.toUpperCase()} - ₹{formData.plan === 'monthly' ? '1,499' : formData.plan === 'quarterly' ? '3,999' : '9,999'}
                    </span>
                  </div>
                </div>
              </div>

              {paymentStatus === 'success' && (
                <div className="bg-green-900/30 border border-green-700 text-green-300 p-6 rounded-lg">
                  <p className="font-semibold text-lg">✅ Payment Successful!</p>
                  <p className="text-sm mt-2">Check your email for confirmation.</p>
                </div>
              )}

              {paymentStatus === 'processing' && (
                <div className="bg-blue-900/30 border border-blue-700 text-blue-300 p-6 rounded-lg flex items-center space-x-3">
                  <Loader className="animate-spin" size={20} />
                  <span>Opening Razorpay...</span>
                </div>
              )}

              {!paymentStatus && (
                <>
                  <div className="bg-orange-900/20 border border-orange-700 text-orange-200 p-4 rounded text-sm">
                    💳 Secure payment with Razorpay
                  </div>

                  <button
                    onClick={handlePayment}
                    className="btn-primary w-full py-3 text-lg flex items-center justify-center space-x-2"
                  >
                    <CreditCard size={20} />
                    <span>Pay Now</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowPaymentForm(false);
                      setMessage('');
                      setMembershipId(null);
                    }}
                    className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600"
                  >
                    Back
                  </button>
                </>
              )}

              {message && !paymentStatus && (
                <p className={`text-center p-4 rounded ${message.includes('✅') ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                  {message}
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Membership;