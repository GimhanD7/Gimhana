import React from 'react';
import { motion } from 'framer-motion';
import Background from '../components/Background';
import SEO from '../components/SEO';

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
    <div className="min-h-screen text-slate-100 selection:bg-violet-500/40 selection:text-white overflow-x-hidden font-main">
      <Background />
      <SEO
        title="About Gimhana Deshapriya | Developer, Designer and Engineer"
        description="Learn about Gimhana Deshapriya’s full-stack development experience, technical skills, UI/UX practice, education, professional work, and community leadership."
        path="/about"
        schema={{ '@type': 'ProfilePage', name: 'About Gimhana Deshapriya', url: 'https://www.gimhan.web.lk/about', mainEntity: { '@id': 'https://www.gimhan.web.lk/#person' } }}
      />

      <main className="container mx-auto px-4 pb-28 pt-36 max-w-7xl relative z-10">
        {/* Header Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left mb-24"
        >
          <div className="grid gap-10 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
            <div className="space-y-7">
              <span className="section-kicker">Biography · Expertise · Leadership</span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.065em] leading-[0.9] text-white font-heading">
                Building systems. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-violet-400 to-fuchsia-400">Shaping experiences.</span>
              </h1>
            </div>
            <div className="modern-card rounded-2xl p-7">
              <p className="text-lg text-slate-300 font-medium leading-relaxed">A full-stack developer and designer connecting reliable engineering with clear, human-centered interfaces.</p>
              <div className="mt-6 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-purple-300"><span className="h-px w-10 bg-purple-400/60" />Gimhana Deshapriya</div>
            </div>
          </div>
        </motion.section>

        {/* Profile Split */}
        <section className="grid lg:grid-cols-[1.05fr_.95fr] gap-12 lg:gap-20 mb-36 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="modern-card rounded-[2rem] p-8 sm:p-12 space-y-9"
          >
            <span className="section-kicker">Working philosophy</span>
            <h2 className="text-4xl font-black text-white tracking-[-0.045em] font-heading">Technology should feel <span className="text-purple-300">clear, useful, and alive.</span></h2>
            <div className="space-y-6 text-lg text-slate-400 font-medium leading-relaxed">
              <p>
                I am <span className="text-white font-bold">Gimhana Deshapriya</span>, an Information Technology graduate and full-stack web developer with expertise in UI/UX design, modern web technologies, and database management.
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
            className="relative min-h-[520px]"
          >
            <div className="absolute inset-x-12 bottom-10 top-10 rounded-full bg-purple-500/20 blur-3xl" />
            <motion.img whileHover={{ scale: 1.025, y: -8 }} transition={{ type: 'spring', stiffness: 220, damping: 22 }} src="/profile.png" alt="Gimhana Deshapriya" className="relative z-10 mx-auto h-auto w-[135%] max-w-none -translate-x-[13%] object-contain" />
            <div className="modern-card absolute bottom-4 right-0 z-20 rounded-2xl px-6 py-4"><span className="block text-[9px] font-black uppercase tracking-[0.22em] text-purple-300">Based in</span><strong className="mt-1 block text-sm text-white">Sri Lanka · GMT +5:30</strong></div>
          </motion.div>
        </section>

        {/* Technical Stack Grid */}
        <section className="mb-36">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
            <div className="max-w-3xl"><span className="section-kicker">Capabilities · 06 disciplines</span><h2 className="mt-4 text-4xl md:text-6xl font-black tracking-[-0.055em] leading-[0.95] text-white">A connected <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-fuchsia-400">technical ecosystem.</span></h2></div>
            <p className="max-w-sm text-slate-400 md:text-right leading-7">Engineering, design, automation, and delivery practices working together—not as isolated tools.</p>
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5"
          >
            {skills.map((category, idx) => (
              <motion.div
                key={category.name}
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                className={`modern-card min-h-[250px] p-8 rounded-[1.75rem] group flex flex-col justify-between ${[
                  'lg:col-span-5', 'lg:col-span-7', 'lg:col-span-4',
                  'lg:col-span-4', 'lg:col-span-4', 'lg:col-span-12'
                ][idx]}`}
              >
                <div className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${category.color} opacity-70`} />
                <div className={`absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${category.color} opacity-[0.07] blur-2xl transition-opacity duration-500 group-hover:opacity-[0.15]`} />
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl border border-purple-300/10 bg-purple-400/[0.07] text-3xl shadow-[0_0_30px_rgba(168,85,247,.08)] transition-all duration-500 group-hover:scale-110 group-hover:border-purple-300/25 group-hover:shadow-[0_0_32px_rgba(168,85,247,.18)]">{category.icon}</div>
                    <span className="text-[10px] font-black text-purple-300/50 tracking-[0.24em]">0{idx + 1}</span>
                  </div>
                  <p className="mt-8 text-[9px] font-black uppercase tracking-[0.22em] text-purple-300/70">Core discipline</p>
                  <h3 className="mt-2 text-2xl font-black text-white tracking-tight group-hover:text-purple-200 transition-colors">{category.name}</h3>
                </div>
                <div className="relative mt-7 flex flex-wrap gap-2">
                  {category.items.map((item, itemIndex) => (
                    <motion.span whileHover={{ y: -2 }} key={item} className="px-3 py-1.5 bg-white/[0.035] rounded-full text-[10px] font-black uppercase tracking-wider text-slate-400 border border-white/[0.07] group-hover:text-slate-200 group-hover:border-purple-400/20 transition-colors font-main">
                      <span className="mr-1.5 text-purple-400/60">{String(itemIndex + 1).padStart(2, '0')}</span>{item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Professional Timeline */}
        <section className="mb-36">
          <div className="mb-14"><span className="section-kicker">Professional timeline</span><h2 className="mt-4 text-4xl md:text-6xl font-black tracking-[-0.055em] text-white">Work that shaped <span className="text-purple-300">the practice.</span></h2></div>
          <div className="relative space-y-6 before:absolute before:bottom-0 before:left-4 before:top-0 before:w-px before:bg-gradient-to-b before:from-purple-400/70 before:via-purple-400/20 before:to-transparent md:before:left-8">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 250, damping: 24 }}
                className="ml-10 md:ml-16 p-8 md:p-10 rounded-2xl modern-card grid lg:grid-cols-12 gap-8 items-start group"
              >
                {/* Visual Accent */}
                <div className="absolute -left-[2.72rem] md:-left-[4.12rem] top-9 h-3 w-3 rounded-full bg-purple-300 shadow-[0_0_18px_rgba(216,180,254,.9)]" />

                {/* Left Side: Metadata and Skills */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="space-y-2">
                    <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-wider">{exp.duration}</span>
                    <h3 className="text-2xl font-black text-white tracking-tight leading-snug group-hover:text-purple-300 transition-colors font-heading">{exp.role}</h3>
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
          <div className="mb-14"><span className="section-kicker">Leadership & community</span><h2 className="mt-4 text-4xl md:text-6xl font-black tracking-[-0.055em] text-white">Beyond the <span className="text-purple-300">codebase.</span></h2></div>
          <div className="grid md:grid-cols-2 gap-5">
            {extracurriculars.map((act, idx) => (
              <motion.div
                key={idx}
                className="modern-card p-8 md:p-10 rounded-2xl group flex flex-col justify-between"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -6, scale: 1.01 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 250, damping: 24 }}
              >
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                      {act.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white tracking-tight leading-tight font-heading">{act.organization}</h3>
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
      <footer className="py-16 border-t border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white font-heading">Gimhana Deshapriya</h2>
          <p className="text-[10px] font-black tracking-[0.28em] text-slate-500 uppercase">Engineer · Designer · Community leader</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
