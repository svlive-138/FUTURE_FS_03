import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Share2 } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/I GYM Real Fitness logo.png" 
                alt="I Gym Logo" 
                className="h-10 w-auto"
              />
              <span className="text-white font-bold text-lg">I Gym</span>
            </div>
            <p className="text-sm text-gray-400">
              Your local gym for fitness, strength, and health transformation.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition text-sm font-bold">
                f
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition text-sm font-bold">
                📷
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition text-sm font-bold">
                𝕏
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-orange-500 transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-orange-500 transition">About Us</Link></li>
              <li><Link to="/membership" className="hover:text-orange-500 transition">Membership</Link></li>
              <li><Link to="/classes" className="hover:text-orange-500 transition">Classes</Link></li>
              <li><Link to="/gallery" className="hover:text-orange-500 transition">Gallery</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-orange-500 transition">Weight Training</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Personal Training</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Cardio Classes</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Yoga & Zumba</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Nutrition Guidance</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-orange-500 mt-1 flex-shrink-0" />
                <span>123 Fitness Lane, Your City, ST 12345</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-orange-500 flex-shrink-0" />
                <a href="tel:+91YOUR_NUMBER" className="hover:text-orange-500 transition">+91 (YOUR) NUMBER</a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-orange-500 flex-shrink-0" />
                <a href="mailto:info@igym.com" className="hover:text-orange-500 transition">info@igym.com</a>
              </div>
            </div>
            <div className="mt-4">
              <a
                href="https://wa.me/91YOUR_NUMBER"
                className="btn-primary inline-block text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} I Gym. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
              <a href="#" className="hover:text-orange-500 transition">Privacy Policy</a>
              <a href="#" className="hover:text-orange-500 transition">Terms of Service</a>
              <a href="#" className="hover:text-orange-500 transition">Refund Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;