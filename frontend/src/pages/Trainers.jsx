import { Badge, Award } from 'lucide-react';

const Trainers = () => {
  const trainers = [
    {
      id: 1,
      name: 'Raj Kumar',
      role: 'Founder & Head Trainer',
      specialization: 'Strength Training & Muscle Building',
      certifications: ['NASM CPT', 'ISSN Certified', 'Strength Coach'],
      image: '👨‍🏫',
      bio: 'With 12+ years of experience in fitness, Raj has transformed hundreds of bodies and lives. His personalized approach ensures results.',
      achievements: [
        '500+ Members Transformed',
        'State Champion Lifter',
        'Featured in Fitness Magazines',
      ]
    },
    {
      id: 2,
      name: 'Priya Singh',
      role: 'Head Coach & Personal Trainer',
      specialization: 'Personal Training & Women\'s Fitness',
      certifications: ['ACE CPT', 'Nutrition Specialist', 'HIIT Certification'],
      image: '👩‍🏫',
      bio: 'Priya specializes in helping women achieve their fitness goals through personalized training and diet guidance.',
      achievements: [
        'Certified Nutrition Specialist',
        '200+ Female Clients',
        'Zumba & Dance Instructor',
      ]
    },
    {
      id: 3,
      name: 'Arjun Patel',
      role: 'Cardio & Endurance Coach',
      specialization: 'HIIT, Cardio & Stamina Building',
      certifications: ['ISSN CPT', 'HIIT Certification', 'Marathon Coach'],
      image: '👨‍🏫',
      bio: 'A former athlete, Arjun brings passion and proven techniques to build cardiovascular strength and endurance.',
      achievements: [
        'Marathon Coach',
        'Expert in HIIT Training',
        '300+ Cardio Clients',
      ]
    },
    {
      id: 4,
      name: 'Anjali Sharma',
      role: 'Yoga & Wellness Instructor',
      specialization: 'Yoga, Flexibility & Mental Wellness',
      certifications: ['RYT 500 Yoga', 'Meditation Coach', 'Wellness Specialist'],
      image: '👩‍🏫',
      bio: 'Anjali combines ancient yoga wisdom with modern wellness practices to help members achieve complete fitness.',
      achievements: [
        'International Yoga Certified',
        '150+ Regular Yoga Students',
        'Wellness Program Designer',
      ]
    },
    {
      id: 5,
      name: 'Vikram Singh',
      role: 'Rehabilitation & Injury Prevention Coach',
      specialization: 'Recovery, Rehab & Injury Prevention',
      certifications: ['NASM Certified', 'Sports Medicine', 'Physical Therapy'],
      image: '👨‍🏫',
      bio: 'Vikram specializes in helping members recover from injuries and prevent future ones through targeted exercises.',
      achievements: [
        'Sports Medicine Certified',
        '100+ Rehab Cases',
        'Partner with Hospitals',
      ]
    },
    {
      id: 6,
      name: 'Meera Gupta',
      role: 'Lifestyle & Nutrition Coach',
      specialization: 'Nutrition, Diet Planning & Lifestyle',
      certifications: ['Registered Dietitian', 'Nutrition Specialist', 'Lifestyle Coach'],
      image: '👩‍🏫',
      bio: 'Meera helps members achieve lasting results through comprehensive nutrition planning and lifestyle changes.',
      achievements: [
        'Registered Dietitian',
        '80+ Success Stories',
        'Corporate Wellness Programs',
      ]
    },
  ];

  return (
    <div className="bg-slate-950">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-950 via-blue-900 to-slate-950 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="section-title">Meet Our Expert Trainers</h1>
          <p className="section-subtitle max-w-3xl mx-auto">
            Certified, experienced, and passionate professionals dedicated to your transformation
          </p>
        </div>
      </section>

      {/* Trainers Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainers.map((trainer) => (
              <div key={trainer.id} className="card p-8 hover:shadow-lg hover:shadow-orange-500/20">
                {/* Trainer Image */}
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-full w-24 h-24 flex items-center justify-center text-5xl mb-6 mx-auto">
                  {trainer.image}
                </div>

                {/* Name & Role */}
                <h3 className="text-2xl font-bold text-white text-center mb-1">{trainer.name}</h3>
                <p className="text-orange-500 text-center font-semibold mb-4">{trainer.role}</p>

                {/* Bio */}
                <p className="text-gray-400 text-center text-sm mb-4">{trainer.bio}</p>

                {/* Specialization */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-white mb-2">Specialization:</p>
                  <p className="text-gray-300 text-sm">{trainer.specialization}</p>
                </div>

                {/* Certifications */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-white mb-2">Certifications:</p>
                  <div className="flex flex-wrap gap-2">
                    {trainer.certifications.map((cert, idx) => (
                      <Badge key={idx} className="bg-blue-900 text-blue-200 px-2 py-1 rounded text-xs">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="border-t border-slate-700 pt-4">
                  <p className="text-sm font-semibold text-white mb-2">Achievements:</p>
                  <ul className="space-y-1">
                    {trainer.achievements.map((achievement, idx) => (
                      <li key={idx} className="text-gray-400 text-xs flex items-start space-x-2">
                        <Award size={14} className="text-orange-500 mt-0.5 flex-shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <button className="btn-primary w-full mt-6">Book Session</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trainer Selection CTA */}
      <section className="py-16 md:py-24 bg-slate-900 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Get One-on-One Guidance</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Our trainers will create a personalized plan based on your goals, fitness level, and preferences. Transform your body with expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/membership" className="btn-primary px-8 py-3">Start Personal Training</a>
            <a href="/contact" className="btn-outline px-8 py-3">Consult with Trainer</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Trainers;