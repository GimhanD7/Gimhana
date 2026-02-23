import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Background from '../components/Background';

const About = () => {
  const skills = [
    {
      name: 'Programming',
      items: ['Java', 'JavaScript', 'PHP', 'C', 'C++', 'Kotlin'],
      icon: '💻',
      color: 'from-blue-500 to-cyan-400'
    },
    {
      name: 'Web Tech',
      items: ['HTML', 'CSS', 'React.js', 'Node.js', 'Express.js'],
      icon: '🌐',
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Databases',
      items: ['MySQL', 'MongoDB', 'Firebase'],
      icon: '🗄️',
      color: 'from-amber-500 to-red-500'
    },
    {
      name: 'Design',
      items: ['Adobe Photoshop', 'Figma', 'UI/UX Design'],
      icon: '🎨',
      color: 'from-emerald-500 to-teal-400'
    }
  ];

  const experiences = [
    {
      role: 'Web Developer',
      company: 'Tuition Class Management System',
      duration: 'January 2025',
      description: 'Designed and developed a comprehensive Tuition Class Management System to manage students, teachers, classes, payments, and attendance.',
      skills: ['React.js', 'Node.js', 'MySQL', 'UI/UX'],
      link: 'https://sudeshmaths.com/'
    },
    {
      role: 'Software Engineer Intern',
      company: 'Associated Newspapers of Ceylon Limited',
      duration: 'July 2024 - Dec 2024',
      description: 'Developed and maintained a PDF Management System for managing newspaper documents across departments.',
      skills: ['PHP', 'MySQL', 'System Enhancement']
    },
    {
      role: 'Web Application Developer',
      company: 'Leo Club of SLIIT (Portal)',
      duration: 'July 2024',
      description: 'Developed a web-based portal to streamline internal operations and member management.',
      skills: ['React.js', 'Firebase', 'Authentication'],
      link: 'https://web.portal.sliitleo.org'
    },
    {
      role: 'Web Developer',
      company: 'Leo Club of SLIIT (Official Web)',
      duration: 'July 2024',
      description: 'Designed and developed the official website with a focus on responsive design and user experience.',
      skills: ['React.js', 'UI/UX', 'Performance Optimization'],
      link: 'https://sliitleo.org'
    }
  ];

  const extracurriculars = [
    {
      role: 'Club Director',
      organization: 'LEO Club of SLIIT',
      duration: '2025 - Present',
      description: 'Leading strategic direction and club initiatives with focus on youth empowerment.',
    },
    {
      role: 'Graphic Designer',
      organization: 'Digital Media Crew – IET On Campus, SLIIT',
      duration: '2022 - Present',
      description: 'Driving visual storytelling and media production for faculty events.',
    },
    {
      role: 'Chief Editor',
      organization: 'LEO Club of SLIIT',
      duration: '2024 - 2025',
      description: 'Orchestrated editorial content and digital publication strategies.',
    }
  ];

  return (
    <div className="min-h-screen text-slate-900 selection:bg-purple-100 selection:text-purple-900 overflow-x-hidden font-main">
      <Background />
      <Helmet>
        <title>Identity | Gimhana Deshapriya</title>
        <meta name="description" content="Philosophies, Expertise, and Professional Journey." />
      </Helmet>

      <main className="container mx-auto px-4 py-32 max-w-7xl relative z-10">
        {/* Header Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left mb-32"
        >
          <div className="flex flex-col md:flex-row justify-between items-end gap-10">
            <div className="space-y-6">
              <span className="text-xs font-black tracking-[0.5em] text-purple-600 uppercase">Biography & Expertise</span>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none text-slate-950 font-heading">
                Human. <br />
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 underline decoration-purple-500/10">Designer.</span> <br />
                Developer.
              </h1>
            </div>
            <p className="text-xl text-slate-600 max-w-sm font-medium leading-relaxed italic opacity-70">
              "Fusing architectural precision with digital liquidity to create interfaces that breathe."
            </p>
          </div>
        </motion.section>

        {/* Profile Split */}
        <section className="grid lg:grid-cols-2 gap-24 mb-40 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <h2 className="text-3xl font-black text-slate-950 uppercase tracking-tight font-heading">The <span className="text-purple-600 italic">Philosophy</span></h2>
            <div className="space-y-8 text-lg text-slate-600 font-medium leading-relaxed">
              <p>
                I am <span className="text-slate-950 font-bold">Gimhana Deshapriya</span>, a craftsman in the digital realm. My work is defined by the intersection of rigorous engineering principles and fluid design aesthetics.
              </p>
              <p>
                With a deep background in IT and software engineering from SLIIT, I've cultivated a mindset that values stability without sacrificing beauty. I don't just write code; I architect ecosystems that empower users and elevate brands.
              </p>
              <p>
                My journey has taken me from the precise world of tea factory artwork design to the complex architecture of full-stack applications. This dual perspective allows me to bridge the gap between "how it looks" and "how it functions" seamlessly.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass p-8 rounded-[4rem] shadow-2xl relative z-10">
              <div className="aspect-square rounded-[3rem] overflow-hidden bg-slate-100 grayscale hover:grayscale-0 transition-all duration-1000 shadow-inner">
                <img
                  src="/profile.png"
                  alt="Identity"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop' }}
                />
              </div>
            </div>
            {/* Background Accent */}
            <div className="absolute -top-10 -right-10 w-full h-full bg-purple-500/10 rounded-[4rem] blur-[100px] -z-10" />
          </motion.div>
        </section>

        {/* Technical Stack Grid */}
        <section className="mb-40">
          <div className="flex items-center gap-6 mb-16">
            <h2 className="text-3xl font-black text-slate-950 uppercase tracking-widest font-heading">Tech <span className="italic text-purple-600">Ecosystem</span></h2>
            <div className="h-[1px] flex-1 bg-slate-100" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((category, idx) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass p-10 rounded-[2.5rem] group hover:bg-slate-50 transition-all duration-500"
              >
                <div className="text-4xl mb-8 group-hover:scale-125 transition-transform duration-500">{category.icon}</div>
                <h3 className="text-xl font-bold mb-6 text-slate-950 uppercase tracking-tighter">{category.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map(item => (
                    <span key={item} className="px-3 py-1 bg-white rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 border border-slate-100 group-hover:text-purple-600 group-hover:border-purple-100 transition-colors">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Professional Timeline */}
        <section className="mb-40">
          <div className="flex items-center gap-6 mb-16">
            <h2 className="text-3xl font-black text-slate-950 uppercase tracking-widest font-heading">Work <span className="italic text-indigo-600">History</span></h2>
            <div className="h-[1px] flex-1 bg-slate-100" />
          </div>
          <div className="space-y-4">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group flex flex-col md:flex-row md:items-center justify-between p-10 rounded-3xl glass hover:bg-white transition-all duration-500 gap-6"
              >
                <div className="space-y-2">
                  <span className="text-xs font-black tracking-widest text-indigo-600 opacity-50 uppercase">{exp.duration}</span>
                  <h3 className="text-2xl font-bold text-slate-950 tracking-tighter group-hover:text-indigo-600 transition-colors">{exp.role}</h3>
                  <p className="text-slate-400 font-bold italic">{exp.company}</p>
                </div>
                <p className="md:max-w-md text-slate-600 font-medium leading-relaxed font-main">
                  {exp.description}
                </p>
                {exp.link && (
                  <a href={exp.link} target="_blank" className="p-4 rounded-full bg-slate-50 hover:bg-indigo-600 hover:text-white transition-all self-start md:self-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Leadership & Activities */}
        <section className="mb-20">
          <div className="flex items-center gap-6 mb-16">
            <h2 className="text-3xl font-black text-slate-950 uppercase tracking-widest font-heading">Beyond <span className="italic text-pink-600">Logic</span></h2>
            <div className="h-[1px] flex-1 bg-slate-100" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {extracurriculars.map((act, idx) => (
              <motion.div
                key={idx}
                className="glass p-10 rounded-[3rem] text-center group transition-all duration-700 hover:shadow-2xl hover:shadow-pink-500/10"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-pink-50 rounded-3xl flex items-center justify-center mx-auto mb-8 text-pink-600 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-950 mb-2 uppercase tracking-tighter">{act.role}</h3>
                <p className="text-sm font-black text-pink-600 mb-6 opacity-50 tracking-widest uppercase">{act.duration}</p>
                <p className="text-slate-500 italic font-bold mb-4">{act.organization}</p>
                <p className="text-slate-600 text-sm font-medium leading-relaxed font-main">{act.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer Identity */}
      <footer className="py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter opacity-10 uppercase font-heading">Gimhana Deshapriya</h2>
          <div className="flex justify-center gap-12 text-[10px] font-black tracking-[0.4em] text-slate-400 uppercase">
            <a href="#" className="hover:text-purple-600 transition-colors">Manifesto</a>
            <a href="#" className="hover:text-purple-600 transition-colors">Artifacts</a>
            <a href="#" className="hover:text-purple-600 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;