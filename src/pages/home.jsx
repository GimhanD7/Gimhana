import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';
import Background from '../components/Background';

const ArtworkPopup = ({ isOpen, onClose, artworkUrl }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-5xl bg-white rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-1">
              <iframe
                src={artworkUrl}
                className="w-full h-[75vh] border-0 rounded-lg"
                title="Portfolio Showcase"
                allowFullScreen
              />
            </div>
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 transition-colors shadow-lg"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const getIconName = (tech) => {
  const mapping = {
    'node.js': 'nodejs',
    'c++': 'cplusplus'
  };
  const key = tech.toLowerCase();
  return mapping[key] || key;
};

const Home = () => {
  const [isArtworkOpen, setIsArtworkOpen] = useState(false);
  const [artworkUrl, setArtworkUrl] = useState('');

  return (
    <div className="min-h-screen text-slate-900 selection:bg-purple-100 selection:text-purple-900 overflow-x-hidden">
      <Background />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[95vh] flex flex-col items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10 w-full font-heading">
          <motion.div
            className="text-left space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-4">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass italic text-purple-700 text-sm font-bold shadow-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
                Open for Collaboration
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-slate-950">
                Building <br />
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent italic">Digital__</span> <br />
                Impact.
              </h1>
            </div>
            <p className="text-xl text-slate-600 max-w-lg leading-relaxed font-medium font-main">
              Information Technology graduate and full-stack web developer with comprehensive expertise in UI/UX design, modern web technologies, and database management. Demonstrated success in developing enterprise-level systems and creating intuitive, mobile-responsive user interfaces.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button primary onClick={() => window.location.href = '#projects'}>Explore Work</Button>
              <Button secondary onClick={() => window.location.href = '#contact'}>Get in CV</Button>
            </div>
          </motion.div>

          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: 50, rotateY: 20 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.div
              className="relative z-10"
              whileHover={{ y: -10 }}
             >
              <div className="relative   p-4 rounded-2xl  overflow-hidden group">
                <div className="aspect-[4/5]   overflow-hidden   relative  ">
                  <img
                    src="/profile.png"
                    alt="Gimhana Deshapriya"
                    className="w-full h-full object-cover transition-transform duration-1000  "
                  />



                </div>
              </div>

              {/* Tech Satellites - Modern & Professional */}
              {[
                { tech: 'react', color: '#61DAFB', delay: 0, pos: '-top-10 -right-10' },
                { tech: 'nodejs', color: '#339933', delay: 1, pos: 'top-1/4 -right-16' },
                { tech: 'php', color: '#777BB4', delay: 2, pos: 'bottom-1/4 -right-20' },
                { tech: 'javascript', color: '#F7DF1E', delay: 0.5, pos: 'top-1/3 -left-20' },
                { tech: 'express', color: '#4479A1', delay: 1.5, pos: 'bottom-1/3 -left-16' }
              ].map((item) => (
                <motion.div
                  key={item.tech}
                  className={`absolute ${item.pos} z-20`}
                >
                  <div className="glass p-4 rounded-lg shadow-xl hover:scale-110 transition-transform duration-500 group/sat cursor-default">
                    <div className="relative">
                      <div
                        className="absolute inset-0 blur-md opacity-20 group-hover/sat:opacity-100 transition-opacity"
                        style={{ backgroundColor: item.color }}
                      />
                      <img
                        src={`/icons/${item.tech}-${item.tech === 'php' || item.tech === 'mysql' ? 'plain' : 'original'}.svg`}
                        alt={item.tech}
                        className="w-8 h-8 relative z-10 grayscale group-hover/sat:grayscale-0 transition-all duration-500"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}

               
            </motion.div>
          </motion.div>
        </div>

        {/* Dynamic Tech Bar */}
        <div className="w-full mt-24 border-y border-slate-50 py-12">
          <div className="flex flex-col items-center gap-10">
            <p className="text-[10px] font-black tracking-[0.5em] text-slate-400 uppercase">Core Stack & Expertise</p>
            <div className="flex flex-wrap justify-center gap-10 md:gap-16">
              {['React', 'Node.js', 'PHP', 'JavaScript', 'MySQL', 'MongoDB'].map((tech) => (
                <span key={tech} className="text-2xl md:text-4xl font-black tracking-tighter text-slate-200 hover:text-purple-600 hover:scale-110 transition-all duration-500 cursor-default opacity-50 hover:opacity-100 select-none">
                  {tech}.
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education & Experience Split Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Education */}
          <div className="space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-950 mb-4 font-heading">
                Academic <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent italic">Legacy</span>
              </h2>
            </motion.div>

            <div className="space-y-8">
              {[
                {
                  year: 'January 2026 - Present',
                  title: 'BBA (Honors) - Marketing Management',
                  sub: 'Universidad Azteca',
                  desc: 'Pursuing a degree in Marketing Management to complement technical expertise with business strategy and organizational leadership.'
                },
                {
                  year: '2021 - 2025',
                  title: 'Bachelor of Information Technology (Honors)',
                  sub: 'Sri Lanka Institute of Information Technology (SLIIT)',
                  desc: 'Comprehensive curriculum covering software engineering, web development, database systems, UI/UX design, and project management.'
                },
                {
                  year: '2017 - 2019',
                  title: 'Advanced Level - Mathematics Stream',
                  sub: 'Thakshila College, Gampaha',
                  desc: 'Core foundation in mathematical logic, physics, and chemistry, laying the groundwork for software engineering and analytical skills.'
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="glass p-8 rounded-xl hover:bg-slate-50 transition-all duration-500 group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <span className="text-xs font-black tracking-widest text-purple-600 uppercase mb-4 block opacity-50 font-main">{item.year}</span>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors uppercase tracking-tight font-heading">{item.title}</h3>
                  <p className="text-slate-500 font-bold text-sm mb-4 italic">{item.sub}</p>
                  <p className="text-slate-600 leading-relaxed font-main font-medium">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-950 mb-4 font-heading">
                Professional <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent italic">Impact</span>
              </h2>
            </motion.div>

            <div className="space-y-8">
              {[
                {
                  year: 'January 2025',
                  title: 'Web Developer',
                  sub: 'Tuition Class Management Systems',
                  desc: 'Architected and developed comprehensive tuition management platforms serving multiple user roles with automated payments and enrollment systems.',
                  links: [
                    { label: 'Manoj Maths', url: 'http://mathswithmanoj.com/' },
                    { label: 'Sudesh Maths', url: 'https://sudeshmaths.com/' }
                  ]
                },
                {
                  year: 'July 2024 - December 2024',
                  title: 'Software Engineer Intern',
                  sub: 'Associated Newspapers of Ceylon Limited',
                  desc: 'Developed and maintained an enterprise-grade PDF Management System handling document workflows across multiple newspaper departments.',
                  links: []
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="glass p-8 rounded-xl hover:bg-slate-50 transition-all duration-500 group"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                    <span className="text-xs font-black tracking-widest text-indigo-600 uppercase opacity-50 font-main">{item.year}</span>
                    {item.links && item.links.length > 0 && (
                      <div className="flex flex-wrap gap-3">
                        {item.links.map((link, lIdx) => (
                          <button
                            key={lIdx}
                            onClick={() => { setArtworkUrl(link.url); setIsArtworkOpen(true); }}
                            className="text-[10px] font-black tracking-widest text-indigo-600 uppercase border-b border-indigo-200 hover:border-indigo-600 transition-all font-main cursor-pointer"
                          >
                            View {link.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors uppercase tracking-tight font-heading">{item.title}</h3>
                  <p className="text-slate-500 font-bold text-sm mb-4 italic">{item.sub}</p>
                  <p className="text-slate-600 leading-relaxed font-main font-medium">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="py-32 bg-slate-950 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-indigo-600" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none italic uppercase">
              Technical <br /> Mastery.
            </h2>
            <p className="text-slate-400 max-w-sm font-medium text-lg leading-relaxed font-main">
              A curated selection of technologies I wield to build future-ready digital platforms.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              'React', 'Node.js', 'PHP', 'JavaScript', 'Java',
              'MySQL', 'MongoDB', 'Express', 'C', 'C++',
              'Kotlin', 'Figma'
            ].map((tech, idx) => (
              <motion.div
                key={tech}
                className="bg-slate-900/50 p-8 rounded-xl flex flex-col items-center justify-center gap-6 hover:bg-slate-900 hover:shadow-purple-500/10 transition-all duration-500 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-600/20 transition-all duration-500">
                  <img
                    src={`/icons/${getIconName(tech)}-original.svg`}
                    alt={tech}
                    className="w-6 h-6 grayscale group-hover:grayscale-0"
                    onError={(e) => {
                      const iconName = getIconName(tech);
                      if (!e.target.src.endsWith('-plain.svg')) {
                        e.target.src = `/icons/${iconName}-plain.svg`;
                      }
                    }}
                  />
                </div>
                <span className="text-xs font-black tracking-widest uppercase text-slate-500 group-hover:text-white transition-colors">{tech}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-stretch">
          <div className="space-y-12">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-950 font-heading">
              Let's <span className="italic text-purple-600 underline decoration-indigo-500/30">Connect</span>
            </h2>
            <div className="space-y-8 max-w-md">
              <p className="text-xl text-slate-600 font-medium leading-relaxed font-main">
                Have a project in mind? Let's discuss how we can build something extraordinary together.
              </p>
              <div className="space-y-6 pt-8 border-t border-slate-100">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-lg bg-slate-100 flex items-center justify-center text-purple-600 shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase mb-1 font-main">Email</p>
                    <p className="text-lg font-bold text-slate-900 font-main">
                      <a href="mailto:gimhandeshapriya567@gmail.com" className="hover:text-purple-600 transition-colors">gimhandeshapriya567@gmail.com</a>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-lg bg-slate-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase mb-1 font-main">Phone</p>
                    <p className="text-lg font-bold text-slate-900 font-main">
                      <a href="tel:+94768582057" className="hover:text-emerald-600 transition-colors">+94 76 8582 057</a>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-lg bg-slate-100 flex items-center justify-center text-pink-600 shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase mb-1 font-main">Website</p>
                    <p className="text-lg font-bold text-slate-900 font-main">
                      <a href="https://www.gimhan.me" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 transition-colors">www.gimhan.me</a>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-lg bg-slate-100 flex items-center justify-center text-indigo-600 shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase mb-1 font-main">Location</p>
                    <p className="text-lg font-bold text-slate-900 font-main">257, Indolamulla, Dompe, Sri Lanka</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            className="glass p-12 rounded-2xl shadow-2xl relative overflow-hidden border border-slate-100/50 space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              <span className="text-[10px] font-black tracking-widest uppercase text-slate-400 font-main">Operational Status</span>
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-2xl font-black text-slate-950 tracking-tight font-heading">Accepting New Ventures</span>
              </div>
            </div>

            <div className="space-y-6 pt-8 border-t border-slate-100">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-black tracking-widest uppercase text-slate-400 font-main">Timezone</span>
                  <p className="text-base font-bold text-slate-950 font-main">GMT +5:30 (SLST)</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-black tracking-widest uppercase text-slate-400 font-main">Response Window</span>
                  <p className="text-base font-bold text-slate-950 font-main">Within 12 Hours</p>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-black tracking-widest uppercase text-slate-400 font-main">Primary Focus Areas</span>
                <p className="text-base font-bold text-slate-950 leading-relaxed font-main">
                  Enterprise Portals, Process Automation Pipelines, Responsive System Architectures.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="mailto:gimhandeshapriya567@gmail.com"
                className="w-full inline-flex items-center justify-center py-4 bg-slate-950 text-white font-black tracking-[0.2em] uppercase rounded-lg hover:bg-purple-600 transition-all duration-500 shadow-lg hover:shadow-purple-500/10 font-main"
              >
                Initiate Dialogue
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <ArtworkPopup isOpen={isArtworkOpen} onClose={() => setIsArtworkOpen(false)} artworkUrl={artworkUrl} />

      {/* Footer Branding */}
      <footer className="py-12 border-t border-slate-50 mt-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400 uppercase font-black text-[10px] tracking-[0.3em]">
          <p>© 2025 Gimhana Deshapriya.</p>
          <div className="flex gap-8">
            <a href="https://github.com" className="hover:text-purple-600 transition-colors">GitHub</a>
            <a href="https://linkedin.com" className="hover:text-indigo-600 transition-colors">LinkedIn</a>
          </div>
          <p>Handcrafted with Precision.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
