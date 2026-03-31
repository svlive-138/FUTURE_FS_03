import { Clock, Users, Zap } from 'lucide-react';

const Classes = () => {
  const classes = [
    {
      name: 'Weight Training',
      icon: '🏋️',
      description: 'Build strength and muscle with our comprehensive weight training program.',
      instructor: 'Raj Kumar',
      schedule: 'Mon-Fri: 6 AM, 6 PM | Sat-Sun: 7 AM, 5 PM',
      duration: '60 mins',
      level: 'All Levels',
      capacity: 12,
    },
    {
      name: 'Personal Training',
      icon: '👥',
      description: 'One-on-one personalized sessions tailored to your fitness goals.',
      instructor: 'Priya Singh',
      schedule: 'Available 24/7',
      duration: '45-60 mins',
      level: 'Beginner to Advanced',
      capacity: 1,
    },
    {
      name: 'Cardio & Endurance',
      icon: '🏃',
      description: 'High-intensity cardio sessions to boost your stamina and heart health.',
      instructor: 'Arjun Patel',
      schedule: 'Mon-Fri: 7 AM, 7 PM | Sat-Sun: 8 AM, 6 PM',
      duration: '45 mins',
      level: 'Intermediate to Advanced',
      capacity: 20,
    },
    {
      name: 'Yoga & Flexibility',
      icon: '🧘',
      description: 'Improve flexibility, balance, and mental peace with our yoga sessions.',
      instructor: 'Anjali Sharma',
      schedule: 'Mon-Fri: 6 AM, 5 PM | Sat: 7 AM',
      duration: '60 mins',
      level: 'All Levels',
      capacity: 25,
    },
    {
      name: 'Zumba & Dance',
      icon: '💃',
      description: 'Fun, energetic dance sessions that burn calories while having a blast!',
      instructor: 'Priya Singh',
      schedule: 'Tue-Thu: 6 PM | Sat: 4 PM',
      duration: '45 mins',
      level: 'All Levels',
      capacity: 30,
    },
    {
      name: 'HIIT Circuit Training',
      icon: '⚡',
      description: 'High-intensity interval training for maximum results in minimum time.',
      instructor: 'Arjun Patel',
      schedule: 'Mon-Fri: 6:30 PM | Sat-Sun: 6 PM',
      duration: '45 mins',
      level: 'Intermediate to Advanced',
      capacity: 15,
    },
  ];

  const weekSchedule = [
    { day: 'Monday', classes: ['Weight Training 6 AM', 'Cardio 7 AM', 'HIIT 6:30 PM', 'Weight Training 6 PM'] },
    { day: 'Tuesday', classes: ['Weight Training 6 AM', 'Yoga 6 AM', 'Zumba 6 PM'] },
    { day: 'Wednesday', classes: ['Cardio 7 AM', 'Weight Training 6 PM', 'HIIT 6:30 PM'] },
    { day: 'Thursday', classes: ['Weight Training 6 AM', 'Yoga 5 PM', 'Zumba 6 PM'] },
    { day: 'Friday', classes: ['Cardio 7 AM', 'Weight Training 6 PM', 'HIIT 6:30 PM'] },
    { day: 'Saturday', classes: ['Weight Training 7 AM', 'Cardio 8 AM', 'Yoga 7 AM', 'Zumba 4 PM', 'HIIT 6 PM'] },
    { day: 'Sunday', classes: ['Weight Training 7 AM', 'Cardio 8 AM', 'HIIT 6 PM'] },
  ];

  return (
    <div className="bg-slate-950">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-950 via-blue-900 to-slate-950 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="section-title">Our Classes & Services</h1>
          <p className="section-subtitle max-w-3xl mx-auto">
            Diverse fitness programs led by certified trainers for every level and goal
          </p>
        </div>
      </section>

      {/* Classes Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {classes.map((classItem, index) => (
              <div key={index} className="card p-8 hover:shadow-lg hover:shadow-orange-500/20">
                <div className="text-5xl mb-4">{classItem.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{classItem.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{classItem.description}</p>

                <div className="space-y-3 border-t border-slate-700 pt-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Users size={16} className="text-orange-500" />
                    <span className="text-gray-400"><strong className="text-white">Instructor:</strong> {classItem.instructor}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock size={16} className="text-orange-500" />
                    <span className="text-gray-400">{classItem.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Zap size={16} className="text-orange-500" />
                    <span className="text-gray-400">{classItem.level}</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-slate-800 rounded text-sm text-gray-300">
                  <p className="font-semibold text-white mb-1">Schedule:</p>
                  <p>{classItem.schedule}</p>
                </div>

                <button className="btn-primary w-full mt-4">Book Now</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Schedule */}
      <section className="py-16 md:py-24 bg-slate-900 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-12">Weekly Class Schedule</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {weekSchedule.map((item, index) => (
              <div key={index} className="card p-6">
                <h3 className="text-lg font-bold text-orange-500 mb-4">{item.day}</h3>
                <ul className="space-y-3">
                  {item.classes.map((classEvent, cidx) => (
                    <li key={cidx} className="text-sm text-gray-300 flex items-start space-x-2">
                      <span className="text-orange-500 mt-1">▪</span>
                      <span>{classEvent}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration */}
      <section className="py-16 md:py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Join?</h2>
          <p className="text-gray-400 mb-8">
            All classes are included in your membership. First class is FREE!
          </p>
          <a href="/membership" className="btn-primary text-lg px-8 py-4">
            Get Your Free Trial
          </a>
        </div>
      </section>
    </div>
  );
};

export default Classes;