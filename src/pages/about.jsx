import React from 'react';
import { motion } from 'framer-motion';
import Background from '../components/Background';

const About = () => {
  const skills = [
    {
      name: 'Programming',
      items: ['Java', 'JavaScript (ES6+)', 'PHP', 'C', 'C++', 'Kotlin'],
      icon: '💻',
      color: 'from-blue-500 to-cyan-400'
    },
    {
      name: 'Web Tech',
      items: ['HTML5', 'CSS3', 'React.js', 'Node.js', 'Express.js', 'RESTful APIs', 'Responsive Design'],
      icon: '🌐',
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Databases',
      items: ['MySQL', 'MongoDB', 'PHP PDO', 'Database Design & Optimization'],
      icon: '🗄️',
      color: 'from-amber-500 to-red-500'
    },
    {
      name: 'Design',
      items: ['Adobe Photoshop', 'Figma', 'UI/UX Design', 'Wireframing', 'Prototyping'],
      icon: '🎨',
      color: 'from-emerald-500 to-teal-400'
    },
    {
      name: 'Automation',
      items: ['Power Automate', 'Workflow Automation', 'Process Optimization', 'Email Automation'],
      icon: '⚡',
      color: 'from-orange-500 to-yellow-400'
    },
    {
      name: 'Practices',
      items: ['Agile Methodology', 'Version Control (Git)', 'Code Review', 'Testing & Debugging', 'System Architecture'],
      icon: '🛠️',
      color: 'from-indigo-500 to-blue-500'
    }
  ];

  const experiences = [
    {
      role: 'Web Developer',
      company: 'Tuition Class Management Systems',
      duration: 'January 2025',
      bullets: [
        'Architected and developed comprehensive tuition management platforms serving multiple user roles including students, teachers, and administrators across two independent educational institutions.',
        'Implemented advanced features including student enrollment systems, class scheduling, automated payment processing, real-time attendance tracking, and comprehensive result evaluation modules.',
        'Designed role-based access control systems with customized dashboards optimizing workflows for different user types and institutional requirements.',
        'Integrated payment gateway functionality and automated notification systems for improved communication between administrators, teachers, and students.',
        'Enhanced system performance and user experience through responsive design principles, intuitive interface development, and optimized database queries ensuring scalability.'
      ],
      skills: ['React.js', 'Node.js', 'MySQL', 'Express', 'Responsive Design'],
      links: [
        { label: 'Manoj Maths', url: 'http://mathswithmanoj.com/' },
        { label: 'Sudesh Maths', url: 'https://sudeshmaths.com/' }
      ]
    },
    {
      role: 'Software Engineer Intern',
      company: 'Associated Newspapers of Ceylon Limited',
      duration: 'July 2024 - December 2024',
      bullets: [
        'Developed and maintained an enterprise-grade PDF Management System handling document workflows across multiple newspaper departments.',
        'Implemented system enhancements improving document organization efficiency, search functionality, and cross-departmental collaboration.',
        'Collaborated with senior engineering teams following industry-standard development practices, code review processes, and agile methodologies.',
        'Participated in requirements gathering, technical documentation, and system testing to ensure high-quality deliverables.'
      ],
      skills: ['PHP', 'MySQL', 'JavaScript', 'System Enhancement']
    },
    {
      role: 'Web Application Developer',
      company: 'Leo Club of SLIIT',
      duration: 'July 2024',
      bullets: [
        'Engineered a comprehensive web-based portal streamlining internal club operations and member management processes.',
        'Implemented secure authentication protocols, role-based access controls, and user-friendly dashboards for enhanced operational efficiency.',
        'Conducted extensive testing and iterative improvements based on user feedback to optimize system usability and performance.'
      ],
      skills: ['React.js', 'PHP', 'MySQL', 'Authentication', 'Responsive Design'],
      links: [
        { label: 'Leo Portal', url: 'https://web.portal.sliitleo.org' }
      ]
    },
    {
      role: 'Web Developer',
      company: 'Leo Club of SLIIT Official Website',
      duration: 'July 2024',
      bullets: [
        'Designed and developed the official Leo Club website with emphasis on responsive design and exceptional user experience.',
        'Applied modern UI/UX practices to enhance accessibility, usability, and visual appeal across all device platforms.',
        'Managed complete website architecture, content integration, SEO optimization, and performance tuning.'
      ],
      skills: ['React.js', 'UI/UX Design', 'Performance Tuning', 'SEO Optimization'],
      links: [
        { label: 'Official Site', url: 'https://sliitleo.org' }
      ]
    },
    {
      role: 'Artwork Designer',
      company: 'JCEY Tea Factory',
      duration: 'July 2023 - December 2023',
      bullets: [
        'Designed comprehensive tea box packaging for 7 regional variants and 10 flavor-based products, ensuring alignment with brand identity and market positioning.',
        'Created engaging promotional artwork and marketing materials for both digital and print platforms.',
        'Collaborated with marketing stakeholders to deliver high-quality creative assets within brand guidelines and project timelines.'
      ],
      skills: ['Adobe Photoshop', 'Figma', 'Branding', 'Graphic Design']
    },
    {
      role: 'Freelance Social Media Post Designer',
      company: 'Freelance Visual Branding',
      duration: 'January 2022 - Present',
      bullets: [
        'Designed engaging and visually compelling social media content for diverse clients across multiple platforms including Facebook, Instagram, and LinkedIn.',
        'Improved brand visibility and audience engagement through strategic creative visual content development and platform-optimized designs.'
      ],
      skills: ['Adobe Photoshop', 'Graphic Design', 'Visual Branding']
    }
  ];

  const extracurriculars = [
    {
      organization: 'Leo Club of SLIIT',
      icon: '🦁',
      color: 'from-amber-500 to-orange-600',
      roles: [
        { title: 'Club Director', period: '2025 - Present', desc: 'Leading strategic planning, member development, and community service initiatives.' },
        { title: 'Chief Editor', period: '2024 - 2025', desc: 'Managed content creation, editorial workflows, and publication standards.' },
        { title: 'Graphic Designer', period: '2022 - 2024', desc: 'Created visual content for events, campaigns, and digital platforms.' }
      ]
    },
    {
      organization: 'Digital Media Crew - IET On Campus, SLIIT',
      icon: '📷',
      color: 'from-purple-500 to-indigo-600',
      roles: [
        { title: 'Graphic Designer', period: '2022 - Present', desc: 'Producing creative assets for technical events and engineering society communications.' }
      ]
    },
    {
      organization: 'Media Unit - SLIIT',
      icon: '🎙️',
      color: 'from-pink-500 to-rose-600',
      roles: [
        { title: 'Graphic Designer', period: '2022 - 2023', desc: 'Developed visual content for university-wide events and institutional communications.' }
      ]
    },
    {
      organization: 'Mozilla Campus Club of SLIIT',
      icon: '🦊',
      color: 'from-orange-500 to-red-600',
      roles: [
        { title: 'Graphic Designer', period: '2023 - 2024', desc: 'Designed promotional materials for open-source technology workshops and community events.' }
      ]
    }
  ];

  return (
    <div className="min-h-screen text-slate-900 selection:bg-purple-100 selection:text-purple-900 overflow-x-hidden font-main">
      <Background />
      <title>Identity | Gimhana Deshapriya</title>
      <meta name="description" content="Philosophies, Expertise, and Professional Journey." />

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
                I am <span className="text-slate-950 font-bold">Gimhana Deshapriya</span>, an Information Technology graduate and full-stack web developer with comprehensive expertise in UI/UX design, modern web technologies, and database management. My work is defined by the intersection of rigorous engineering principles and fluid design aesthetics.
              </p>
              <p>
                With a deep background in IT and software engineering, I've cultivated a mindset that values stability without sacrificing beauty. I have demonstrated success in developing enterprise-level management systems, implementing secure authentication protocols, and creating intuitive user interfaces.
              </p>
              <p>
                My journey has taken me from the precise world of tea box packaging design to the complex architecture of full-stack applications and workflow automation using tools like Microsoft Power Automate. This dual perspective allows me to bridge the gap between technical development and creative design, committed to delivering innovative, user-centric digital solutions.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass p-8 rounded-2xl shadow-2xl relative z-10">
              <div className="aspect-square rounded-xl overflow-hidden bg-slate-100 grayscale hover:grayscale-0 transition-all duration-1000 shadow-inner">
                <img
                  src="/profile.png"
                  alt="Identity"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop' }}
                />
              </div>
            </div>
            {/* Background Accent */}
            <div className="absolute -top-10 -right-10 w-full h-full bg-purple-500/5 rounded-2xl -z-10" />
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
                className="glass p-10 rounded-xl group hover:bg-slate-50 transition-all duration-500"
              >
                <div className="text-4xl mb-8 group-hover:scale-125 transition-transform duration-500">{category.icon}</div>
                <h3 className="text-xl font-bold mb-6 text-slate-950 uppercase tracking-tighter">{category.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map(item => (
                    <span key={item} className="px-3 py-1 bg-white rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 border border-slate-100 group-hover:text-purple-600 group-hover:border-purple-100 transition-colors font-main">
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
          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-10 rounded-xl glass hover:bg-white transition-all duration-500 grid lg:grid-cols-12 gap-8 items-start relative overflow-hidden group shadow-sm hover:shadow-xl border border-slate-100/50"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-indigo-500 to-purple-600 opacity-50" />

                {/* Left Side: Metadata and Skills */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="space-y-2">
                    <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-wider">{exp.duration}</span>
                    <h3 className="text-2xl font-black text-slate-950 tracking-tight leading-snug group-hover:text-indigo-600 transition-colors font-heading">{exp.role}</h3>
                    <p className="text-slate-500 font-bold text-base">{exp.company}</p>
                  </div>

                  {/* Skills tagged to this role */}
                  {exp.skills && (
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Stack Used</span>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.skills.map((s) => (
                          <span key={s} className="px-2.5 py-1 bg-slate-50 text-[10px] font-semibold text-slate-600 rounded-lg border border-slate-100 font-main">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Links */}
                  {exp.links && exp.links.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Launch Project</span>
                      <div className="flex flex-wrap gap-3">
                        {exp.links.map((link, lIdx) => (
                          <a
                            key={lIdx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-200"
                          >
                            <span>{link.label}</span>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Side: Bullet highlights */}
                <div className="lg:col-span-8 space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-2">Key Achievements</span>
                  <ul className="space-y-4">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex gap-4 items-start text-slate-600 leading-relaxed font-medium">
                        <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                        <span className="text-slate-600 font-medium leading-relaxed font-main text-[15px]">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
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
          <div className="grid md:grid-cols-2 gap-8">
            {extracurriculars.map((act, idx) => (
              <motion.div
                key={idx}
                className="glass p-8 md:p-10 rounded-xl group transition-all duration-700 hover:shadow-2xl hover:shadow-pink-500/5 border border-slate-100/50 flex flex-col justify-between"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                      {act.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-950 tracking-tight leading-tight font-heading">{act.organization}</h3>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {act.roles.map((role, rIdx) => (
                      <div key={rIdx} className="relative pl-6 border-l-2 border-pink-100 hover:border-pink-500 transition-colors py-1">
                        <div className="absolute w-2 h-2 bg-pink-500 rounded-full -left-[5px] top-2.5" />
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                          <span className="text-base font-bold text-slate-900 leading-tight font-heading">{role.title}</span>
                          <span className="text-[10px] font-black tracking-wider text-pink-600 bg-pink-50 px-2 py-0.5 rounded-md self-start sm:self-auto font-main">{role.period}</span>
                        </div>
                        <p className="text-slate-600 text-sm font-medium leading-relaxed font-main">{role.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
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
            <button type="button" className="hover:text-purple-600 transition-colors bg-transparent border-0 p-0 text-[10px] font-black tracking-[0.4em] uppercase text-slate-400 cursor-pointer font-main">Manifesto</button>
            <button type="button" className="hover:text-purple-600 transition-colors bg-transparent border-0 p-0 text-[10px] font-black tracking-[0.4em] uppercase text-slate-400 cursor-pointer font-main">Artifacts</button>
            <button type="button" className="hover:text-purple-600 transition-colors bg-transparent border-0 p-0 text-[10px] font-black tracking-[0.4em] uppercase text-slate-400 cursor-pointer font-main">Contact</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
