import { CheckCircle } from 'lucide-react';

const About = () => {
  const values = [
    {
      title: 'Excellence',
      description: 'Pursuing excellence in every aspect of fitness and training'
    },
    {
      title: 'Community',
      description: 'Building a supportive community of fitness enthusiasts'
    },
    {
      title: 'Integrity',
      description: 'Operating with honesty and transparency in all dealings'
    },
    {
      title: 'Innovation',
      description: 'Continuously upgrading equipment and training methods'
    },
  ];

  const team = [
    {
      name: 'Raj Kumar',
      role: 'Founder & Director',
      specialty: 'Strength Training',
      image: '👨‍🏫'
    },
    {
      name: 'Priya Singh',
      role: 'Head Trainer',
      specialty: 'Personal Training',
      image: '👩‍🏫'
    },
    {
      name: 'Arjun Patel',
      role: 'Fitness Coach',
      specialty: 'Cardio & Endurance',
      image: '👨‍🏫'
    },
    {
      name: 'Anjali Sharma',
      role: 'Yoga Instructor',
      specialty: 'Yoga & Flexibility',
      image: '👩‍🏫'
    },
  ];

  return (
    <div className="bg-slate-950">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-950 via-blue-900 to-slate-950 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h1 className="section-title">About I Gym</h1>
            <p className="section-subtitle max-w-3xl mx-auto">
              Founded in 2018, I Gym has been transforming lives through dedication, expertise, and state-of-the-art facilities.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white mb-4">Our Story</h2>
              <p className="text-gray-300 leading-relaxed">
                I Gym started with a simple mission: to make professional fitness training accessible to everyone in the community. What began as a small gym has now grown into a fitness hub serving over 500 members.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Our founder, Ishu Chauhan, believed that fitness should not be intimidating. He created I Gym as a place where beginners and athletes alike could achieve their goals in a supportive environment.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Today, we're proud to offer state-of-the-art equipment, expert trainers, and diverse programs that cater to every fitness level and goal.
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl h-64 md:h-96 flex items-center justify-center shadow-2xl">
               <img className='w-full h-full' src="https://th.bing.com/th/id/OIP.w--F0VaIzRgjoSOavoiqGwHaEo?w=290&h=181&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="gyming" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-slate-900 border-y border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="card p-8 bg-gradient-to-br from-slate-900 to-blue-900 border-blue-800">
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed">
                To inspire and empower individuals to achieve their best physical and mental health through professional training, quality equipment, and a supportive community environment.
              </p>
            </div>
            <div className="card p-8 bg-gradient-to-br from-slate-900 to-orange-900 border-orange-800">
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-gray-300 leading-relaxed">
                To be the most trusted and accessible fitness center in the community, known for transforming lives and creating lasting healthy habits in every member.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-16">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card p-8 flex items-start space-x-4">
                <CheckCircle className="w-8 h-8 text-orange-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-slate-900 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-subtitle">Expert trainers dedicated to your success</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="card p-6 text-center hover:shadow-lg hover:shadow-orange-500/20">
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                <p className="text-orange-500 text-sm font-semibold mb-2">{member.role}</p>
                <p className="text-gray-400 text-sm">{member.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-16">Why Join I Gym?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { num: '500+', label: 'Members Transformed' },
              { num: '15+', label: 'Certified Trainers' },
              { num: '50+', label: 'New Members Monthly' },
              { num: '1000s', label: 'Success Stories' },
            ].map((stat, index) => (
              <div key={index} className="card p-8 text-center">
                <p className="text-4xl font-bold text-orange-500 mb-2">{stat.num}</p>
                <p className="text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;