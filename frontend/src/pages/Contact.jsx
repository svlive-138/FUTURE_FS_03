import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { submitContactForm } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await submitContactForm(formData);
      setMessage('Thank you for contacting us! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      setMessage('Error sending message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      details: '123 Fitness Lane, Your City, State 12345',
      link: 'https://maps.google.com/?q=123+Fitness+Lane'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: '+91 (98765) 43210',
      link: 'tel:+919876543210'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'info@igym.com',
      link: 'mailto:info@igym.com'
    },
    {
      icon: Clock,
      title: 'Hours',
      details: '24/7 Open\nSupport: 6 AM - 10 PM',
      link: null
    },
  ];

  return (
    <div className="bg-slate-950">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-950 via-blue-900 to-slate-950 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="section-title">Contact Us</h1>
          <p className="section-subtitle max-w-3xl mx-auto">
            Have questions? Get in touch with us. We're here to help!
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div key={index} className="card p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-orange-500 p-4 rounded-lg flex-shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">{info.title}</h3>
                        {info.link ? (
                          <a
                            href={info.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-orange-500 transition text-sm"
                          >
                            {info.details}
                          </a>
                        ) : (
                          <p className="text-gray-300 whitespace-pre-line text-sm">{info.details}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/9251052000?text=Hi%20I%20Gym%2C%20I%27m%20interested%20in%20your%20membership%20plans"
                target="_blank"
                rel="noopener noreferrer"
                className="card p-6 bg-gradient-to-r from-green-900 to-green-800 border-green-700 hover:shadow-lg hover:shadow-green-500/20"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-4xl">💬</span>
                  <div>
                    <h3 className="text-lg font-bold text-white">Chat on WhatsApp</h3>
                    <p className="text-green-200 text-sm">Quick response guaranteed!</p>
                  </div>
                </div>
              </a>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Your Name"
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
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Subject"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                      placeholder="Your message here..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full py-3 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={18} />
                    <span>{loading ? 'Sending...' : 'Send Message'}</span>
                  </button>

                  {message && (
                    <p className={`text-center p-4 rounded ${message.includes('Thank') ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                      {message}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Our Facility Section */}
      <section className="py-16 md:py-24 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">Visit Our Facility</h2>
          <p className="text-gray-400 text-center mb-12 max-w-3xl mx-auto">
            Come experience I Gym in person! Our state-of-the-art facility is designed to help you achieve your fitness goals.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="rounded-lg overflow-hidden shadow-2xl border border-slate-800">
              <img 
                src="/gym-storefront.png" 
                alt="I Gym Storefront - Real Fitness Unisex" 
                className="w-full h-auto object-cover hover:scale-105 transition duration-300"
              />
            </div>

            {/* Facility Info */}
            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="text-2xl font-bold text-white mb-4">Experience I Gym</h3>
                <p className="text-gray-300 mb-4">
                  Our modern gym facility features state-of-the-art equipment, expert trainers, and a welcoming community of fitness enthusiasts.
                </p>
              </div>

              <div className="card p-6 bg-gradient-to-br from-orange-900 to-orange-800 border-orange-700">
                <h4 className="text-xl font-bold text-white mb-3">Owner Information</h4>
                <div className="space-y-2">
                  <p className="text-gray-100">
                    <span className="font-semibold">Owner:</span> Ishu Chauhan
                  </p>
                  <p className="text-gray-100">
                    <span className="font-semibold">Contact:</span> <a href="tel:+919719576838" className="text-orange-300 hover:text-orange-200">+91 9719576838</a>
                  </p>
                  <p className="text-gray-100">
                    <span className="font-semibold">Hours:</span> 24/7 Open
                  </p>
                </div>
              </div>

              <div className="card p-6">
                <h4 className="text-lg font-bold text-white mb-3">Facility Highlights</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center space-x-2">
                    <span className="text-orange-500">✓</span>
                    <span>Modern Equipment & Machines</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-orange-500">✓</span>
                    <span>Expert & Certified Trainers</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-orange-500">✓</span>
                    <span>Clean & Hygienic Environment</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-orange-500">✓</span>
                    <span>Unisex Facility</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-orange-500">✓</span>
                    <span>Personalized Training Programs</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 md:py-24 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Find Us On The Map</h2>
          <div className="rounded-lg overflow-hidden shadow-xl border border-slate-800 h-96">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3664.8520850355617!2d72.59555!3d19.07609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c13c5c5c5c5d%3A0x5c5c5c5c5c5c5c5c!2sYour%20Gym!5e0!3m2!1sen!2sin!4v1234567890"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Quick FAQ */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-12">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {[
              {
                q: 'What are your working hours?',
                a: 'We are open 24/7 for member access. Staff support is available from 6 AM to 10 PM daily.'
              },
              {
                q: 'Do you offer trial sessions?',
                a: 'Yes! All new members get a FREE 1-week trial with no credit card required.'
              },
              {
                q: 'Can I cancel my membership anytime?',
                a: 'Monthly memberships have no lock-in period. Quarterly and yearly plans have standard cancellation policies.'
              },
              {
                q: 'Do I need prior gym experience?',
                a: 'Not at all! Our trainers work with beginners to advanced athletes. Everyone is welcome!'
              },
            ].map((item, index) => (
              <details key={index} className="card p-6 group">
                <summary className="cursor-pointer font-semibold text-white flex items-center justify-between">
                  <span>{item.q}</span>
                  <span className="group-open:text-orange-500">▼</span>
                </summary>
                <p className="text-gray-400 mt-4">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;