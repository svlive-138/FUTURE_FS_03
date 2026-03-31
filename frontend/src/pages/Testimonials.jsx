import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Amit Kumar',
      role: 'Software Engineer',
      image: '👨',
      rating: 5,
      testimonial: 'Joined 6 months ago and the transformation has been unbelievable! The trainers are incredibly knowledgeable and supportive. Best decision ever!',
      transformation: 'Lost 15kg, Gained strength',
      before: '85kg',
      after: '70kg'
    },
    {
      name: 'Neha Sharma',
      role: 'Business Owner',
      image: '👩',
      rating: 5,
      testimonial: 'The personalized training with Priya changed everything. Not just the physical transformation, but also the confidence boost!',
      transformation: 'Lost 12kg, Gained confidence',
      before: '72kg',
      after: '60kg'
    },
    {
      name: 'Vikram Singh',
      role: 'Student',
      image: '👨',
      rating: 5,
      testimonial: 'From zero fitness to able to do 50 pushups! The HIIT training is intense but super effective. Highly recommended!',
      transformation: 'Gained 8kg muscle, Improved endurance',
      before: 'No fitness',
      after: 'Athletic'
    },
    {
      name: 'Priya Gupta',
      role: 'Accountant',
      image: '👩',
      rating: 5,
      testimonial: 'The yoga classes have given me peace of mind along with physical fitness. The whole team is amazing!',
      transformation: 'Improved flexibility & mental health',
      before: 'Stiff & stressed',
      after: 'Flexible & peaceful'
    },
    {
      name: 'Raj Patel',
      role: 'Marketing Professional',
      image: '👨',
      rating: 5,
      testimonial: 'Never thought I could be this fit at 45! The personalized diet plan combined with training actually works.',
      transformation: 'Lost 18kg, Fit at 45',
      before: '92kg',
      after: '74kg'
    },
    {
      name: 'Anjali Verma',
      role: 'Teacher',
      image: '👩',
      rating: 5,
      testimonial: 'The zumba classes are so fun! I don\'t even realize I\'m working out. Plus made amazing friends here!',
      transformation: 'Lost 10kg, Found community',
      before: '68kg',
      after: '58kg'
    },
    {
      name: 'Sanjay Kumar',
      role: 'Business Executive',
      image: '👨',
      rating: 5,
      testimonial: 'After my injury, the rehabilitation program was outstanding. Now I\'m stronger than before.',
      transformation: 'Recovered from injury, Stronger',
      before: 'Injured',
      after: 'Stronger than ever'
    },
    {
      name: 'Divya Singh',
      role: 'Doctor',
      image: '👩',
      rating: 5,
      testimonial: 'The nutrition guidance along with training gave me sustainable results. Not a crash diet gym!',
      transformation: 'Sustainable weight loss & health',
      before: 'Unhealthy',
      after: 'Optimal health'
    },
  ];

  const stats = [
    { number: '500+', label: 'Happy Members' },
    { number: '450+', label: 'Successful Transformations' },
    { number: '4.9/5', label: 'Average Rating' },
    { number: '95%', label: 'Retention Rate' },
  ];

  return (
    <div className="bg-slate-950">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-950 via-blue-900 to-slate-950 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="section-title">Member Testimonials</h1>
          <p className="section-subtitle max-w-3xl mx-auto">
            Real stories from real members who transformed their lives at I Gym
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-slate-900 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-orange-500">{stat.number}</p>
                <p className="text-gray-400 text-sm mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card p-6 hover:shadow-lg hover:shadow-orange-500/20">
                {/* Header */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="text-3xl">{testimonial.image}</div>
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-xs">{testimonial.role}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-orange-500 fill-orange-500" />
                  ))}
                </div>

                {/* Testimonial */}
                <p className="text-gray-300 text-sm mb-4 italic">"{testimonial.testimonial}"</p>

                {/* Transformation */}
                <div className="bg-slate-800 rounded p-3 border border-slate-700">
                  <p className="text-xs text-gray-400 mb-2">Transformation:</p>
                  <p className="text-orange-500 font-semibold text-sm">{testimonial.transformation}</p>
                  <p className="text-xs text-gray-400 mt-2">{testimonial.before} → {testimonial.after}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Members Choose Us */}
      <section className="py-16 md:py-24 bg-slate-900 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-12">Why Members Love I Gym</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Expert Guidance', description: 'Certified trainers provide personalized guidance for each member' },
              { title: 'Community Support', description: 'Be part of a supportive community on your fitness journey' },
              { title: 'Great Results', description: 'Our members achieve real, measurable transformations' },
              { title: 'Professional Atmosphere', description: 'A clean, well-maintained facility with top equipment' },
              { title: 'Flexible Plans', description: 'Membership plans that fit your budget and schedule' },
              { title: 'Comprehensive Programs', description: 'From weight loss to strength gain, we have programs for all goals' },
            ].map((item, index) => (
              <div key={index} className="card p-6">
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Your Success Story Starts Here</h2>
          <p className="text-gray-400 mb-8">
            Join hundreds of members who've transformed their lives. Get your FREE trial today!
          </p>
          <a href="/membership" className="btn-primary text-lg px-8 py-4">
            Start Your Transformation
          </a>
        </div>
      </section>

      {/* Video Testimonial Section */}
      <section className="py-12 bg-slate-900 border-t border-slate-800">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-6">Watch Real Member Stories</h3>
          <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg flex items-center justify-center border border-slate-800">
            <div className="text-center">
              <span className="text-6xl mb-4 block">🎥</span>
              <p className="text-gray-400">Video testimonials coming soon!</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;