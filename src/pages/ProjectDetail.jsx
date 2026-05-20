import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Background from '../components/Background';
import { projectService } from '../utils/projectService';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Lightbox gallery state
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  useEffect(() => {
    const loadProject = async () => {
      try {
        setIsLoading(true);
        const data = await projectService.getProject(id);
        setProject(data);
      } catch (err) {
        console.error('Failed to load project details:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadProject();
  }, [id]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === -1 || !project || !project.gallery) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxIndex(-1);
      else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % project.gallery.length);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, project]);

  if (isLoading) {
    return (
      <div className="min-h-screen text-slate-900 overflow-x-hidden font-main relative">
        <Background />
        <main className="container mx-auto px-4 py-32 max-w-7xl relative z-10 flex flex-col items-center justify-center min-h-[80vh]">
          <div className="w-16 h-16 rounded-full border-4 border-purple-500/20 border-t-purple-600 animate-spin" />
          <p className="mt-6 text-sm font-bold tracking-widest text-slate-400 uppercase animate-pulse">
            Synchronizing Project Parameters...
          </p>
        </main>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen text-slate-900 overflow-x-hidden font-main relative">
        <Background />
        <main className="container mx-auto px-4 py-32 max-w-7xl relative z-10 text-center flex flex-col items-center justify-center min-h-[70vh] space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-slate-950 uppercase tracking-tight font-heading">Project Not Found</h2>
          <p className="text-slate-500 max-w-md font-medium text-sm">
            The requested deployment identifier could not be verified in our dynamic database indexes.
          </p>
          <Link
            to="/projects"
            className="px-6 py-3 bg-slate-950 text-white font-black tracking-widest text-[9px] uppercase rounded-xl hover:bg-purple-600 transition-colors shadow-md"
          >
            Return to Catalog
          </Link>
        </main>
      </div>
    );
  }

  const galleryImages = Array.isArray(project.gallery) ? project.gallery.filter(Boolean) : [];

  return (
    <div className="min-h-screen text-slate-900 selection:bg-purple-100 selection:text-purple-900 overflow-x-hidden font-main relative">
      <Background />
      <title>{project.title} | Gimhana Deshapriya</title>
      <meta name="description" content={project.description.slice(0, 150)} />

      {/* Floating sliding back button */}
      <div className="fixed top-24 left-4 sm:left-10 z-50">
        <Link
          to="/projects"
          className="inline-flex items-center gap-3 px-5 py-3 glass hover:bg-slate-950 hover:text-white rounded-2xl shadow-lg border border-slate-100 hover:scale-105 duration-300 transition-all group"
        >
          <svg
            className="w-4 h-4 transform group-hover:-translate-x-1.5 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-[10px] font-black tracking-widest uppercase">Catalog</span>
        </Link>
      </div>

      <main className="container mx-auto px-4 py-32 max-w-7xl relative z-10">
        
        {/* Full-width Panoramic Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-[320px] sm:h-[480px] rounded-[3.5rem] overflow-hidden border border-slate-100 shadow-2xl mb-16"
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent" />
          
          {/* Hero details inside glassmorphic gradient card */}
          <div className="absolute bottom-0 inset-x-0 p-8 sm:p-16 text-white space-y-4">
            <div className="flex flex-wrap gap-3 items-center">
              <span className="px-4 py-1.5 rounded-full bg-purple-600/35 backdrop-blur-md border border-purple-400/30 text-[9px] font-black tracking-widest uppercase text-purple-200">
                {project.category}
              </span>
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                • {project.period}
              </span>
            </div>
            <h1 className="text-3xl sm:text-6xl font-black tracking-tighter leading-tight font-heading text-white uppercase max-w-5xl">
              {project.title}
            </h1>
          </div>
        </motion.div>

        {/* Content Layout Grid split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          
          {/* Left: Deep writeups description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-8 space-y-8"
          >
            <div className="space-y-4">
              <span className="text-xs font-black tracking-[0.3em] text-purple-600 uppercase block pl-1">ARCHITECTURE INDEX</span>
              <h2 className="text-3xl font-black tracking-tight text-slate-950 uppercase font-heading">
                Operational Overview.
              </h2>
            </div>
            
            <p className="text-slate-600 font-medium leading-relaxed font-main text-lg sm:text-xl whitespace-pre-line bg-white/40 p-8 rounded-[2.5rem] border border-slate-100/50 shadow-sm backdrop-blur-sm">
              {project.description}
            </p>
          </motion.div>

          {/* Right Sidebar: Tech chips, Dates, category and links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-4 bg-slate-50/50 p-8 sm:p-10 rounded-[3rem] border border-slate-100/60 shadow-inner backdrop-blur-md space-y-10"
          >
            {/* Tech Chips */}
            <div className="space-y-5">
              <h4 className="text-xs font-black tracking-widest uppercase text-slate-400 font-main">Wielded Stack</h4>
              <div className="flex flex-wrap gap-2.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[9px] font-black tracking-widest uppercase px-3.5 py-2 bg-white text-purple-600 border border-slate-100 rounded-xl shadow-sm hover:scale-105 transition-all cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Launch Links Deck */}
            {project.links && project.links.length > 0 && (
              <div className="space-y-5 pt-6 border-t border-slate-100">
                <h4 className="text-xs font-black tracking-widest uppercase text-slate-400 font-main">Operational Endpoints</h4>
                <div className="flex flex-col gap-3.5">
                  {project.links.map((lnk) => (
                    <a
                      key={lnk.url}
                      href={lnk.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-3.5 py-4 bg-slate-950 text-white font-black tracking-widest text-[9px] uppercase rounded-2xl hover:bg-purple-600 transition-all duration-300 shadow-md group"
                    >
                      <span>LAUNCH {lnk.label}</span>
                      <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* General Meta Details */}
            <div className="space-y-4 pt-6 border-t border-slate-100 text-xs font-main">
              <div className="flex justify-between items-center py-1">
                <span className="font-bold text-slate-400">Status</span>
                <span className="font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2.5 py-0.5 rounded">Active</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="font-bold text-slate-400">Scope</span>
                <span className="font-black text-slate-700 uppercase tracking-widest">{project.category}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="font-bold text-slate-400">Index</span>
                <span className="font-black text-slate-700 italic tracking-wider">{id.substring(0, 8)}...</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Multi-Image Gallery Layout */}
        {galleryImages.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-24 pt-20 border-t border-slate-100 space-y-10"
          >
            <div className="space-y-4">
              <span className="text-xs font-black tracking-[0.3em] text-purple-600 uppercase block pl-1">SCREENSHOT INDEX</span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950 uppercase font-heading">
                Operational Canvas.
              </h2>
              <p className="text-slate-400 font-medium text-sm font-main max-w-xl">
                High-fidelity layout screenshots displaying user workflows, responsive designs, and core architecture layouts.
              </p>
            </div>

            {/* Grid display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleryImages.map((img, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03, y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="aspect-[16/10] overflow-hidden rounded-[2rem] border border-slate-100/50 bg-slate-50 cursor-zoom-in hover:shadow-xl duration-300 transition-all shadow-sm relative group"
                  onClick={() => setLightboxIndex(index)}
                >
                  <img
                    src={img}
                    alt={`Screenshot ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay hover effect */}
                  <div className="absolute inset-0 bg-purple-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="p-3 bg-white/90 backdrop-blur rounded-full text-purple-600 shadow-md">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m4-3H6" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

      </main>

      {/* High-Fidelity Fullscreen Lightbox Slideshow Overlay */}
      <AnimatePresence>
        {lightboxIndex > -1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(-1)}
          >
            {/* Top Navigation Controls bar */}
            <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-[210]">
              <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                IMAGE {lightboxIndex + 1} OF {galleryImages.length}
              </span>
              <button
                onClick={() => setLightboxIndex(-1)}
                className="p-3 rounded-2xl bg-white/10 hover:bg-white text-white hover:text-slate-900 transition-all shadow-lg hover:scale-105 duration-300"
                aria-label="Close Lightbox"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Left Selector Trigger */}
            {galleryImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
                }}
                className="absolute left-6 p-4 rounded-2xl bg-white/5 hover:bg-white text-white hover:text-slate-900 border border-white/5 shadow-2xl hover:scale-110 duration-300 transition-all hidden md:flex items-center justify-center z-[210]"
                aria-label="Previous Image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* High-Resolution Screenshot Holder */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="max-w-[85vw] max-h-[80vh] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages[lightboxIndex]}
                alt={`Lightbox active shot ${lightboxIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain rounded-[2rem]"
              />
            </motion.div>

            {/* Right Selector Trigger */}
            {galleryImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
                }}
                className="absolute right-6 p-4 rounded-2xl bg-white/5 hover:bg-white text-white hover:text-slate-900 border border-white/5 shadow-2xl hover:scale-110 duration-300 transition-all hidden md:flex items-center justify-center z-[210]"
                aria-label="Next Image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Inline swipe instructions (mobile only) */}
            <div className="absolute bottom-6 inset-x-0 text-center pointer-events-none md:hidden">
              <span className="text-[8px] font-black tracking-widest text-slate-500 uppercase">
                Swipe or click outside to close
              </span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Branding */}
      <footer className="py-24 border-t border-slate-100 mt-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[10px] font-black tracking-[0.5em] text-slate-400 uppercase">
            Curated with Architectural Intent. © 2025
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ProjectDetail;
