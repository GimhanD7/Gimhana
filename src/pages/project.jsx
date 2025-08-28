import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Background from '../components/Background';

const Projects = () => {
  const projects = [
    {
      title: 'Mini - Research Project - Project Module Management System',
      period: '3rd Year 2nd Semester',
      description: 'A comprehensive project management system for academic purposes.',
      technologies: ['React JS', 'Node JS', 'Express JS', 'MongoDB'],
      category: 'Web Development'
    },
    {
      title: 'Fitness Hub',
      period: '3rd Year 2nd Semester',
      description: 'A web application for fitness tracking and workout management.',
      technologies: ['Java', 'Spring Boot', 'React', 'MongoDB'],
      category: 'Web Development'
    },
    {
      title: 'Human-Computer Interaction Usability Study',
      period: '3rd Year 1st Semester',
      description: 'Collaborated in a team to identify and improve usability issues within a software application.',
      technologies: ['Usability Testing', 'User Research', 'Prototyping'],
      category: 'Research'
    },
    {
      title: 'Critical Risk Scenario Analysis',
      period: '3rd Year 1st Semester',
      description: 'Developed an Information Asset Risk Management Plan to identify and assess potential risks to critical information assets using the OCTAVE Allegro framework.',
      technologies: ['Risk Assessment', 'Security Analysis', 'OCTAVE Allegro'],
      category: 'Security'
    },
    {
      title: 'Online Learning Management System',
      period: '2nd Year 2nd Semester',
      description: 'A comprehensive platform for online education and course management.',
      technologies: ['React JS', 'Node JS', 'Express JS', 'MongoDB', 'Postman'],
      category: 'Web Development'
    },
    {
      title: 'Freelance App for Designers',
      period: '2nd Year 2nd Semester',
      description: 'Android mobile application designed for designers in Sri Lanka to connect with clients and showcase their work.',
      technologies: ['Kotlin', 'Firebase'],
      category: 'Mobile Development'
    },
    {
      title: 'Staff Management System',
      period: '2nd Year 1st Semester',
      description: 'Web-based system to digitize and streamline staff management processes.',
      technologies: ['HTML', 'CSS', 'Java', 'MySQL'],
      category: 'Web Development'
    },
    {
      title: 'Online Pharmacy Portal',
      period: '2nd Year 1st Semester',
      description: 'Web platform for managing pharmacy inventory and online orders.',
      technologies: ['HTML', 'CSS', 'Java', 'MySQL'],
      category: 'Web Development'
    }
  ];

  const categories = [...new Set(projects.map(project => project.category))];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen text-gray-800 dark:text-gray-200 relative">
      <Background />
      <Helmet>
        <title>Projects | Gimhana Deshapriya</title>
        <meta name="description" content="Explore my academic and personal projects" />
      </Helmet>

      <main className="container mx-auto px-4 py-12 md:py-20 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
            My Projects
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A collection of my academic and personal projects showcasing my skills and learning journey.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === 'All'
                ? 'bg-indigo-600 text-white'
                : 'bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50'
            }`}
          >
            All Projects
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
              className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
                  <span className="text-xs px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200 rounded-full">
                    {project.category}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                <div className="mt-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{project.period}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i}
                        className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700/50 rounded-full text-gray-700 dark:text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default Projects;