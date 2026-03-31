import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Users, Clock, Award, Heart, Zap } from 'lucide-react';

const Home = () => {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribeStatus('Thank you for subscribing!');
      setEmail('');
      setTimeout(() => setSubscribeStatus(''), 3000);
    }
  };

  const features = [
    {
      icon: Dumbbell,
      title: 'State-of-the-Art Equipment',
      description: 'Latest gym equipment and machines for all fitness levels'
    },
    {
      icon: Users,
      title: 'Expert Trainers',
      description: 'Certified trainers ready to guide your fitness journey'
    },
    {
      icon: Clock,
      title: 'Flexible Hours',
      description: '24/7 access to facilities with flexible membership plans'
    },
    {
      icon: Award,
      title: 'Proven Results',
      description: 'Join hundreds of transformed members'
    },
    {
      icon: Heart,
      title: 'Wellness Programs',
      description: 'Comprehensive health and nutrition guidance'
    },
    {
      icon: Zap,
      title: 'Group Classes',
      description: 'Dynamic yoga, zumba, and cardio classes daily'
    },
  ];

  return (
    <div className="bg-slate-950">
      {/* Hero Section */}
      <section className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center md:text-left space-y-6">
              <h1 className="section-title leading-tight">
                Transform Your Body, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400">Transform Your Life</span>
              </h1>
              <p className="section-subtitle text-xl">
                Join thousands of members who've achieved their fitness goals at I Gym. Your journey to a stronger, healthier you starts today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a href="/membership" className="btn-primary text-lg px-8 py-4">Start Free Trial</a>
                <a href="/contact" className="btn-outline text-lg px-8 py-4">Contact Us</a>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div>
                  <p className="text-3xl font-bold text-orange-500">500+</p>
                  <p className="text-gray-400 text-sm">Happy Members</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-orange-500">15+</p>
                  <p className="text-gray-400 text-sm">Expert Trainers</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-orange-500">24/7</p>
                  <p className="text-gray-400 text-sm">Open Access</p>
                </div>
              </div>
            </div>

            {/* Right - Image Placeholder */}
            <div className="hidden md:flex items-center justify-center">
              <div className="relative w-full max-w-md h-96  rounded-2xl shadow-2xl flex items-center justify-center">
                <div className="text-6xl"><img src="/IGYMrealfitnessunisex.png" alt="i gym" /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Why Choose I Gym?</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              We provide everything you need for your fitness transformation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="card p-8 hover:shadow-lg hover:shadow-orange-500/20">
                  <Icon className="w-12 h-12 text-orange-500 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-orange-100 text-lg mb-8">Get 1 week free trial - No credit card required!</p>
          <Link to="/membership" className="bg-white text-orange-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition inline-block">
            Claim Your Free Trial
          </Link>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-slate-900 border-t border-slate-800">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Get Exclusive Offers</h2>
          <p className="text-gray-400 mb-8">Subscribe to our newsletter for exclusive deals, fitness tips, and member benefits</p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg bg-slate-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <button
              type="submit"
              className="btn-primary px-8 py-3 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>

          {subscribeStatus && (
            <p className="text-green-400 mt-4">{subscribeStatus}</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;