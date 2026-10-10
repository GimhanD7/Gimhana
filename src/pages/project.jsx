import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Background from '../components/Background';
import { projectService } from '../utils/projectService';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';

// Project Detail views have been transitioned to dynamic standalone pages at /projects/:id

// Main Projects Archive Component
const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        const data = await projectService.getProjects();
        if (isMounted) {
          setProjects(data);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Failed to load portfolio projects:', err);
        if (isMounted) setIsLoading(false);
      }
    };
    loadData();
    return () => { isMounted = false; };
  }, []);

  const categories = ['All', ...new Set(projects.map(project => project.category))];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen text-slate-100 selection:bg-violet-500/40 selection:text-white overflow-x-hidden font-main">
      <Background />
      <SEO
        title="Web Development Projects | Gimhana Deshapriya Portfolio"
        description="Explore React, PHP, Node.js, MySQL, system design, admin portal, automation, and UI/UX projects developed by Gimhana Deshapriya."
        path="/projects"
        schema={{ '@type': 'CollectionPage', name: 'Web Development Projects by Gimhana Deshapriya', url: 'https://www.gimhan.me/projects' }}
      />

      <main className="container mx-auto px-4 py-32 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="flex justify-between items-start mb-20 max-w-7xl relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left max-w-4xl"
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
          
          {/* Floating Admin Portal trigger button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="pt-4"
          >
            <Link
              to="/admin"
              className="p-4 rounded-2xl glass border border-slate-100/50 hover:bg-slate-950 hover:text-white transition-all duration-500 shadow-md flex items-center gap-2.5 group cursor-pointer"
              title="Admin Portal Console"
            >
              <svg className="w-5 h-5 text-slate-500 group-hover:text-purple-400 group-hover:rotate-45 transition-all duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-[10px] font-black tracking-widest uppercase hidden sm:block">Console</span>
            </Link>
          </motion.div>
        </div>

        {/* Global Filter */}
        <div className="flex flex-wrap items-center gap-4 mb-20 border-b border-slate-100 pb-10">
          <span className="text-[10px] font-black tracking-widest uppercase text-slate-400 mr-4">Filter By Domain:</span>
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black tracking-widest uppercase border transition-all duration-300 ${selectedCategory === category
                ? 'bg-violet-500/20 text-violet-200 border-violet-400/35 shadow-lg shadow-violet-950/30'
                : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.07]'
                }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Loading Skeletons */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="glass overflow-hidden rounded-xl h-[520px] animate-pulse flex flex-col">
                <div className="aspect-[16/10] bg-slate-100" />
                <div className="p-10 flex-1 flex flex-col space-y-6">
                  <div className="h-2 w-1/4 bg-slate-100 rounded" />
                  <div className="h-6 w-3/4 bg-slate-100 rounded" />
                  <div className="h-24 w-full bg-slate-100 rounded" />
                  <div className="pt-6 border-t border-slate-50 flex gap-2">
                    <div className="h-4 w-12 bg-slate-100 rounded" />
                    <div className="h-4 w-16 bg-slate-100 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Dynamic Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id || project.title}
                  onClick={() => navigate(`/projects/${project.id}`)}
                  className="group relative block cursor-pointer"
                >
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    whileHover={{ y: -8, scale: 1.012 }}
                    whileTap={{ scale: 0.99 }}
                    className="h-full"
                  >
                    <div className="modern-card overflow-hidden rounded-2xl transition-colors duration-500 hover:border-violet-400/30 hover:shadow-[0_28px_80px_rgba(76,29,149,.22)] h-full flex flex-col">
                    {/* Image Holder */}
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/70 via-transparent to-transparent opacity-70 group-hover:opacity-35 transition-opacity duration-500" />
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
                      <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-1 font-main line-clamp-3">
                        {project.description}
                      </p>

                      {project.links && project.links.length > 0 && (
                        <div className="flex flex-wrap gap-4 mb-6" onClick={(e) => e.stopPropagation()}>
                          {project.links.map((lnk) => (
                            <a
                              key={lnk.url}
                              href={lnk.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] font-black tracking-widest text-indigo-600 uppercase border-b border-indigo-200 hover:border-indigo-600 transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                              <span>{lnk.label}</span>
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          ))}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-50">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="text-[9px] font-black tracking-widest uppercase px-3 py-1 bg-slate-50 text-slate-400 rounded-lg group-hover:text-purple-600 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="text-[9px] font-black tracking-widest uppercase px-3 py-1 bg-purple-50 text-purple-400 rounded-lg">
                            +{project.technologies.length - 4} More
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* Project Details Modal has been transitioned to dynamic standalone pages */}

      {/* Footer Branding */}
      <footer className="py-32 border-t border-slate-100 mt-40">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[10px] font-black tracking-[0.5em] text-slate-400 uppercase">
            Curated with Architectural Intent. © 2025
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Projects;
