import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';
import { useToast } from '../contexts/ToastContext';
import emailjs from '@emailjs/browser';
import Background from '../components/Background';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100
    }
  }
};

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
            className="relative w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-1">
              <iframe
                src={artworkUrl}
                className="w-full h-[75vh] border-0 rounded-2xl"
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

const Home = () => {
  const toast = useToast();
  const [isArtworkOpen, setIsArtworkOpen] = useState(false);
  const [artworkUrl, setArtworkUrl] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    emailjs.init('uEfOjnUp0V07aWPgO');
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.showError('Required fields missing.');
      return;
    }
    setIsSubmitting(true);
    try {
      await emailjs.send('service_1k7k7ce', 'template_6znvb0k', {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject || 'Portfolio Inquiry',
        message: formData.message,
        to_email: 'gimhanadissanayake7@gmail.com'
      }, 'uEfOjnUp0V07aWPgO');
      toast.showSuccess('Message sent!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.showError('Submission failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
              Information Technology graduate and web developer with a strong foundation in UI/UX design and modern web technologies. Skilled in building responsive, user-friendly web applications.
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
            {/* Absolute Background Glows */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-[120px] animate-pulse delay-1000" />

            <motion.div
              className="relative z-10"
              whileHover={{ y: -10 }}
             >
              <div className="relative   p-4 rounded-[4rem]  overflow-hidden group">
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
              ].map((item, idx) => (
                <motion.div
                  key={item.tech}
                  className={`absolute ${item.pos} z-20`}
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, idx % 2 === 0 ? 10 : -10, 0]
                  }}
                  transition={{
                    duration: 5 + idx,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: item.delay
                  }}
                >
                  <div className="glass p-4 rounded-2xl shadow-xl hover:scale-110 transition-transform duration-500 group/sat cursor-default">
                    <div className="relative">
                      <div
                        className="absolute inset-0 blur-md opacity-20 group-hover/sat:opacity-100 transition-opacity"
                        style={{ backgroundColor: item.color }}
                      />
                      <img
                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${item.tech}/${item.tech}-${item.tech === 'php' || item.tech === 'mysql' ? 'plain' : 'original'}.svg`}
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
                  year: '2026 - Present',
                  title: 'Bachelor of Business Administration',
                  sub: 'Universidad Azteca (Marketing Management)',
                  desc: 'Pursuing a degree in Marketing Management to complement technical expertise with business strategy.'
                },
                {
                  year: '2021 - 2025',
                  title: 'BSc (Hons) in Information Technology',
                  sub: 'Sri Lanka Institute of Information Technology',
                  desc: 'Specialized in building modern web applications and software engineering best practices.'
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="glass p-8 rounded-3xl hover:bg-slate-50 transition-all duration-500 group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <span className="text-xs font-black tracking-widest text-purple-600 uppercase mb-4 block opacity-50">{item.year}</span>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors uppercase tracking-tight">{item.title}</h3>
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
                  year: '2025 Jan',
                  title: 'Web Developer',
                  sub: 'Tuition Class Management System',
                  desc: 'Designed and developed a comprehensive management system for students, teachers, and payments.',
                  link: 'https://sudeshmaths.com/'
                },
                {
                  year: '2024',
                  title: 'Software Engineer Intern',
                  sub: 'Associated Newspapers of Ceylon Limited',
                  desc: 'Developed and maintained a PDF Management System for managing newspaper documents.',
                  link: null
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="glass p-8 rounded-3xl hover:bg-slate-50 transition-all duration-500 group"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-black tracking-widest text-indigo-600 uppercase opacity-50">{item.year}</span>
                    {item.link && (
                      <button
                        onClick={() => { setArtworkUrl(item.link); setIsArtworkOpen(true); }}
                        className="text-[10px] font-black tracking-widest text-indigo-600 uppercase border-b border-indigo-200 hover:border-indigo-600 transition-all"
                      >
                        View Project
                      </button>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{item.title}</h3>
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
              'MySQL', 'MongoDB', 'Firebase', 'C', 'C++',
              'Kotlin', 'Figma'
            ].map((tech, idx) => (
              <motion.div
                key={tech}
                className="bg-slate-900/50 p-8 rounded-[2rem] flex flex-col items-center justify-center gap-6 hover:bg-slate-900 hover:shadow-purple-500/10 transition-all duration-500 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-600/20 transition-all duration-500">
                  <img
                    src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.toLowerCase()}/${tech.toLowerCase()}-original.svg`}
                    alt={tech}
                    className="w-6 h-6 grayscale group-hover:grayscale-0"
                    onError={(e) => { e.target.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.toLowerCase()}/${tech.toLowerCase()}-plain.svg` }}
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
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-purple-600 shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase mb-1">Email</p>
                    <p className="text-lg font-bold text-slate-900">gimhandeshapriya567@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-indigo-600 shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase mb-1">Location</p>
                    <p className="text-lg font-bold text-slate-900">257, Indolamulla, Dompe, Sri Lanka</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            className="glass p-12 rounded-[3.5rem] shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-widest uppercase text-slate-400 pl-2">Full Name</label>
                  <input
                    type="text" name="name" value={formData.name} onChange={handleInputChange} required
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-purple-200 transition-all font-bold placeholder:text-slate-300"
                    placeholder="Enter name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-widest uppercase text-slate-400 pl-2">Email Address</label>
                  <input
                    type="email" name="email" value={formData.email} onChange={handleInputChange} required
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-purple-200 transition-all font-bold placeholder:text-slate-300"
                    placeholder="name@company.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black tracking-widest uppercase text-slate-400 pl-2">Subject</label>
                <input
                  type="text" name="subject" value={formData.subject} onChange={handleInputChange}
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-purple-200 transition-all font-bold placeholder:text-slate-300"
                  placeholder="How can I help?"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black tracking-widest uppercase text-slate-400 pl-2">Message</label>
                <textarea
                  name="message" value={formData.message} onChange={handleInputChange} rows="4" required
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-purple-200 transition-all font-bold placeholder:text-slate-300 resize-none"
                  placeholder="The project brief..."
                />
              </div>
              <button
                type="submit" disabled={isSubmitting}
                className="w-full py-5 bg-slate-950 text-white font-black tracking-[0.2em] uppercase rounded-2xl hover:bg-purple-600 transition-all duration-500 shadow-xl hover:shadow-purple-500/20 disabled:opacity-50"
              >
                {isSubmitting ? 'Transmitting...' : 'Send Message'}
              </button>
            </form>
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