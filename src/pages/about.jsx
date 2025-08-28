import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const About = () => {
  const skills = [
    { 
      name: 'Frontend', 
      items: ['React', 'Next.js', 'JavaScript', 'TypeScript', 'Tailwind CSS'],
      icon: '💻',
      color: 'from-blue-500 to-cyan-400'
    },
    { 
      name: 'Backend', 
      items: ['Node.js', 'Express', 'MongoDB', 'Firebase'],
      icon: '⚙️',
      color: 'from-purple-500 to-pink-500'
    },
    { 
      name: 'UI/UX', 
      items: ['Figma', 'Adobe XD', 'Responsive Design', 'User Research'],
      icon: '🎨',
      color: 'from-amber-500 to-red-500'
    },
    { 
      name: 'DevOps', 
      items: ['Docker', 'AWS', 'CI/CD', 'GitHub Actions'],
      icon: '🚀',
      color: 'from-emerald-500 to-teal-400'
    }
  ];

  const experiences = [
    {
      role: 'Art Work Designer',
      company: 'JCEY Tea Factory',
      duration: '2023',
      description: 'Designed visual content and artwork for marketing and branding purposes.',
      skills: ['Graphic Design', 'Branding', 'Visual Communication']
    },
    {
      role: 'Social Media Post Designer',
      company: 'Freelance',
      duration: '2022',
      description: 'Created engaging social media content and graphics for various clients.',
      skills: ['Social Media Design', 'Content Creation', 'Adobe Creative Suite']
    },
    {
      role: 'Social Media Handler/Editor',
      company: 'Company of Environment',
      duration: '2020',
      description: 'Managed social media presence and content creation. Worked with the Artwork development team to create engaging environmental content.',
      skills: ['Social Media Management', 'Content Strategy', 'Community Engagement'],
      link: 'https://www.facebook.com/companyofenvironment76'
    }
  ];

  const education = [
    {
      degree: 'BSc.(Hons) in Information Technology',
      institution: 'Sri Lanka Institute of Information Technology (SLIIT)',
      year: '2021 - Present'
    },
    {
      degree: 'Advanced Level Examination - Maths Stream',
      institution: 'Thakshila College, Gampaha',
      year: '2017 - 2019',
      description: 'Completed in 2020'
    }
  ];

  const extracurriculars = [
    {
      role: 'Director',
      organization: 'LEO Club of SLIIT',
      duration: 'Jul 2025 - Present',
      description: 'Leading the club\'s initiatives and strategic direction.',
      skills: ['Graphic Design', 'Software Development', 'Leadership']
    },
    {
      role: 'Sub Committee Member',
      organization: 'SLIIT Faculty of Computing Media Unit',
      duration: 'Jul 2024 - Present',
      description: 'Contributing to media and design initiatives for the faculty.',
      skills: ['Adobe Photoshop', 'Graphic Design']
    },
    {
      role: 'Graphic Designer',
      organization: 'Mozilla Campus Club of SLIIT',
      duration: 'Jul 2024 - Present',
      description: 'Designing promotional materials and digital content for tech events.',
      skills: ['Adobe Photoshop', 'Graphic Design']
    },
    {
      role: 'Chief Editor',
      organization: 'LEO Club of SLIIT',
      duration: 'Jul 2024 - Jul 2025',
      description: 'Oversaw content creation and editorial direction.',
      skills: ['Content Strategy', 'Editorial Management', 'Leadership']
    },
    {
      role: 'Graphic Designer',
      organization: 'IET On Campus - SLIIT',
      duration: 'Jul 2023 - Jul 2024',
      description: 'Created visual assets for engineering and technology events.',
      skills: ['Graphic Design', 'Adobe Creative Suite']
    },
    {
      role: 'Member',
      organization: 'SLIIT Faculty of Computing Media Unit',
      duration: 'Jul 2023 - Jul 2024',
      description: 'Created visual content for faculty events and promotions.',
      skills: ['Adobe Photoshop', 'Visual Communication']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200">
      <Helmet>
        <title>About Me | Gimhana Deshapriya</title>
        <meta name="description" content="Learn more about my skills, experience, and journey in software development" />
      </Helmet>

      <main className="container mx-auto px-4 py-12 md:py-20 max-w-7xl">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 relative"
        >
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-10 left-20 w-40 h-40 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          
          <motion.div 
            className="relative z-10"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              About Me
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Crafting digital experiences through <span className="font-semibold text-indigo-600 dark:text-indigo-400">code</span> and <span className="font-semibold text-pink-600 dark:text-pink-400">design</span>
            </p>
          </motion.div>
        </motion.section>

        {/* About Section */}
        <section className="grid lg:grid-cols-3 gap-12 mb-24">
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/10">
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="ml-4 text-sm font-mono text-gray-500">about_me.jsx</span>
              </div>
              
              <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                Who I Am
              </h2>
              <div className="space-y-6 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                <p>
                  <span className="text-indigo-500 dark:text-indigo-400 font-medium">Hello World!</span> I'm a passionate software engineer with a love for crafting exceptional digital experiences. With over 5 years in the industry, I've had the privilege of turning complex problems into elegant, user-friendly solutions.
                </p>
                <p>
                  My journey in tech started with a curiosity about how things work, which evolved into a career building scalable web applications. I specialize in modern JavaScript frameworks and have a keen eye for design and user experience.
                </p>
                <p>
                  When I'm not coding, you can find me contributing to open-source projects, writing technical articles, or exploring the latest in web technologies. I believe in continuous learning and pushing the boundaries of what's possible on the web.
                </p>
              </div>
              
            
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl opacity-70 blur-xl group-hover:opacity-100 transition duration-200"></div>
              <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden border-4 border-white/20 bg-gray-100 dark:bg-gray-800">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 to-purple-600/20"></div>
                <div className="absolute inset-4 rounded-xl overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center overflow-hidden">
                    <img 
                      src="/profile.png" 
                      alt="Gimhana Deshapriya" 
                      className="w-full h-full object-cover object-center"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '';
                        e.target.className = 'hidden';
                        e.target.parentElement.classList.add('bg-gradient-to-br', 'from-indigo-100', 'to-purple-100', 'dark:from-gray-700', 'dark:to-gray-800');
                      }}
                    />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                  <h3 className="text-xl font-bold">Gimhana deshapriya</h3>
                  <p className="text-indigo-200">Senior Software Engineer</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section className="mb-24 relative">
          <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-1/2 h-1/2 bg-indigo-500/10 rounded-full filter blur-3xl -z-10"></div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 rounded-full text-sm font-medium mb-4">
              My Expertise
            </span>
            <h2 className="text-4xl font-bold mb-4">
              Skills & <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">Technologies</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              I've worked with a variety of technologies in the web development world
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((category, index) => (
              <motion.div
                key={category.name}
                className="group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="h-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className={`w-14 h-14 rounded-xl mb-6 flex items-center justify-center text-3xl bg-gradient-to-br ${category.color} text-white`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                    {category.name}
                  </h3>
                  <ul className="space-y-3">
                    {category.items.map((item, i) => (
                      <motion.li 
                        key={i}
                        className="flex items-center text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * i + 0.2 }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-3"></span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <button className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-0.5">
              Download Resume
            </button>
          </div>
        </section>

        {/* Experience Section */}
        <section className="mb-24 relative">
          <div className="absolute -top-20 right-0 w-1/3 h-1/3 bg-purple-500/10 rounded-full filter blur-3xl -z-10"></div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 rounded-full text-sm font-medium mb-4">
              My Journey
            </span>
            <h2 className="text-4xl font-bold mb-4">
              Work <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">Experience</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Professional milestones and career achievements
            </p>
          </motion.div>
          
          <div className="relative max-w-5xl mx-auto">
            {/* Animated timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-indigo-500/20 via-purple-500/30 to-pink-500/20"></div>
            
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div 
                  key={index}
                  className={`relative group ${index % 2 === 0 ? 'md:pr-1/2 md:pl-16' : 'md:pl-1/2 md:pr-16'}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 border-4 border-white dark:border-gray-900 z-10"></div>
                  
                  <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group-hover:shadow-indigo-500/20">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{exp.role}</h3>
                        <p className="text-indigo-600 dark:text-indigo-400 font-medium">{exp.company}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {exp.duration}
                        </p>
                        <p className="mt-3 text-gray-600 dark:text-gray-300">{exp.description}</p>
                        
                        {exp.link && (
                          <a 
                            href={exp.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 rounded-lg font-medium hover:bg-indigo-100 dark:hover:bg-indigo-800/50 transition-colors duration-200"
                          >
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                            </svg>
                            View Project
                          </a>
                        )}
                      </div>
                      
                      {exp.skills && (
                        <div className="flex flex-wrap gap-2 mt-4 md:mt-0 md:max-w-xs">
                          {exp.skills.map((skill, i) => (
                            <span 
                              key={i} 
                              className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-700 dark:from-indigo-900/30 dark:to-indigo-800/30 dark:text-indigo-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-indigo-500/20 animate-ping"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full bg-pink-500/20 animate-ping"></div>
          </div>
        </section>

        {/* Education Section */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 rounded-full text-sm font-medium mb-4">
              My Education
            </span>
            <h2 className="text-4xl font-bold mb-4">
              Academic <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">Background</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Formal education and professional development
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="h-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg p-8 rounded-2xl border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl mr-6 flex-shrink-0">
                      <span className="mt-1">🎓</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{edu.degree}</h3>
                      <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-3">{edu.institution}</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{edu.description}</p>
                      <span className="inline-block px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 text-xs font-medium rounded-full">
                        {edu.year}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Continuous learning is at the heart of what I do. I'm always exploring new technologies and methodologies to stay at the forefront of web development.
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-0.5">
              Let's Work Together
            </button>
          </motion.div>
        </section>

        {/* Extracurricular Activities Section */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 rounded-full text-sm font-medium mb-4">
              Beyond Work
            </span>
            <h2 className="text-4xl font-bold mb-4">
              Extracurricular <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-600">Activities</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Leadership and involvement in student organizations
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {extracurriculars.map((activity, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="h-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{activity.role}</h3>
                  <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-3">{activity.organization}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{activity.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {activity.skills.map((skill, i) => (
                      <span key={i} className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <span className="inline-block mt-3 px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 text-xs font-medium rounded-full">
                    {activity.duration}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        <style jsx global>{`
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -20px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}</style>
      </main>
    </div>
  );
};

export default About;