import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Background from '../components/Background';

const Projects = () => {
  const projects = [
    {
      title: 'Tuition Class Management System',
      period: 'January 2025',
      description: 'A comprehensive system to manage students, teachers, classes, payments, and results. Features role-based access and intuitive dashboards.',
      technologies: ['React.js', 'Node.js', 'MySQL', 'Express'],
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop'
    },
    {
      title: 'Leo Club SLIIT Portal',
      period: 'July 2024',
      description: 'A web-based portal for member management and internal operations. Implemented secure authentication and user-friendly dashboards.',
      technologies: ['React.js', 'Firebase', 'Authentication'],
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop'
    },
    {
      title: 'PDF Management System',
      period: 'July 2024 - Dec 2024',
      description: 'System for managing newspaper documents across departments, improving document organization and workflow efficiency.',
      technologies: ['PHP', 'MySQL', 'JavaScript'],
      category: 'System Design',
      image: 'https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=2030&auto=format&fit=crop'
    },
    {
      title: 'Official Leo Club Website',
      period: 'July 2024',
      description: 'Official website for Leo Club of SLIIT with a focus on responsive design, performance optimization, and modern UI/UX.',
      technologies: ['React.js', 'Tailwind', 'Framer Motion'],
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop'
    },
    {
      title: 'JCEY Tea Packaging Design',
      period: 'July 2023 - Dec 2023',
      description: 'Designed tea box packaging for 7 regional variants and 10 flavor-based products, aligned with brand identity.',
      technologies: ['Adobe Photoshop', 'Figma', 'Branding'],
      category: 'Design',
      image: 'https://images.unsplash.com/photo-1544787210-2211d7c309c7?q=80&w=1974&auto=format&fit=crop'
    },
    {
      title: 'Social Media Visual Branding',
      period: 'January 2022',
      description: 'Crafting engaging visual content for multiple clients to improve brand visibility and audience engagement.',
      technologies: ['Adobe Photoshop', 'Graphic Design'],
      category: 'Design',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop'
    }
  ];

  const categories = ['All', ...new Set(projects.map(project => project.category))];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen text-slate-900 selection:bg-purple-100 selection:text-purple-900 overflow-x-hidden font-main">
      <Background />
      <Helmet>
        <title>Portfolio | Gimhana Deshapriya</title>
        <meta name="description" content="A curated selection of technical solutions and architectural explorations." />
      </Helmet>

      <main className="container mx-auto px-4 py-32 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left mb-24 max-w-4xl"
        >
          <span className="text-xs font-black tracking-[0.5em] text-purple-600 uppercase mb-6 block">The Archive</span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none text-slate-950 font-heading">
            Technical <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Solutions.</span>
          </h1>
          <p className="mt-8 text-xl text-slate-600 font-medium leading-relaxed max-w-2xl">
            A meticulously curated space showcasing my architectural inquiries, system designs, and full-stack implementations.
          </p>
        </motion.div>

        {/* Global Filter */}
        <div className="flex flex-wrap items-center gap-4 mb-20 border-b border-slate-100 pb-10">
          <span className="text-[10px] font-black tracking-widest uppercase text-slate-400 mr-4">Filter By Domain:</span>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-[10px] font-black tracking-widest uppercase transition-all duration-500 ${selectedCategory === category
                ? 'bg-slate-950 text-white shadow-xl shadow-slate-900/20 scale-105'
                : 'bg-white/50 text-slate-400 hover:text-slate-950 hover:bg-white'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative"
              >
                <div className="glass overflow-hidden rounded-[3rem] hover:bg-white transition-all duration-700 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2 h-full flex flex-col">
                  {/* Image Holder */}
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors duration-700" />
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-1.5 rounded-full glass border-white/50 text-[10px] font-black tracking-widest uppercase text-white shadow-lg">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-10 flex-1 flex flex-col">
                    <span className="text-[10px] font-black tracking-widest text-purple-600 uppercase opacity-50 mb-4 block">
                      {project.period}
                    </span>
                    <h3 className="text-xl font-bold text-slate-950 mb-4 tracking-tighter leading-tight font-heading group-hover:text-purple-600 transition-colors uppercase">
                      {project.title}
                    </h3>
                    <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-1 font-main">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-50">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-[9px] font-black tracking-widest uppercase px-3 py-1 bg-slate-50 text-slate-400 rounded-lg group-hover:text-purple-600 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="py-32 border-t border-slate-100 mt-40">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[10px] font-black tracking-[0.5em] text-slate-400 uppercase">
            Curated with Architectural Intent. © 2024
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Projects;