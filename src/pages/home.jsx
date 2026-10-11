import React, { useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Background from '../components/Background';
import SEO, { SITE_URL } from '../components/SEO';
import GitHubSpotlight from '../components/GitHubSpotlight';

const reveal = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const education = [
  { period: '2026 — Present', title: 'BBA (Honors), Marketing Management', organization: 'Universidad Azteca', description: 'Expanding technical expertise with business strategy, marketing, and organizational leadership.' },
  { period: '2021 — 2025', title: 'Bachelor of Information Technology (Honors)', organization: 'Sri Lanka Institute of Information Technology', description: 'Software engineering, modern web development, databases, UI/UX design, and project management.' },
  { period: '2017 — 2019', title: 'Advanced Level, Mathematics Stream', organization: 'Thakshila College, Gampaha', description: 'A foundation in mathematical logic, physics, chemistry, and analytical problem solving.' },
];

const experience = [
  {
    period: 'January 2025', title: 'Web Developer', organization: 'Tuition Class Management Systems',
    description: 'Built role-based tuition platforms with enrollment, attendance, payments, results, and administration workflows.',
    links: [{ label: 'Manoj Maths', url: 'http://mathswithmanoj.com/' }, { label: 'Sudesh Maths', url: 'https://sudeshmaths.com/' }],
  },
  { period: 'July — December 2024', title: 'Software Engineer Intern', organization: 'Associated Newspapers of Ceylon Limited', description: 'Developed and maintained an enterprise PDF management system supporting multi-department document workflows.', links: [] },
];

const skills = [
  ['React', 'react', 'Frontend'], ['JavaScript', 'javascript', 'Language'], ['Node.js', 'nodejs', 'Backend'],
  ['Express', 'express', 'Backend'], ['PHP', 'php', 'Backend'], ['MySQL', 'mysql', 'Database'],
  ['MongoDB', 'mongodb', 'Database'], ['Java', 'java', 'Language'], ['C', 'c', 'Language'],
  ['C++', 'cplusplus', 'Language'], ['Kotlin', 'kotlin', 'Mobile'], ['Figma', 'figma', 'Design'],
].map(([name, icon, group]) => ({ name, icon, group }));

const orbitSkills = [
  { name: 'react', position: '-right-5 top-8' }, { name: 'nodejs', position: '-right-10 top-1/3' },
  { name: 'php', position: '-right-4 bottom-20' }, { name: 'javascript', position: '-left-7 top-1/4' },
  { name: 'mysql', position: '-left-8 bottom-24' },
];

const ArtworkPopup = ({ isOpen, onClose, artworkUrl }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div initial={{ opacity: 0, backdropFilter: 'blur(0px)' }} animate={{ opacity: 1, backdropFilter: 'blur(16px)' }} exit={{ opacity: 0, backdropFilter: 'blur(0px)' }} className="fixed inset-0 z-[100] grid place-items-center bg-[#03050b]/80 p-4" onClick={onClose}>
        <motion.div initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: 20 }} animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }} exit={{ opacity: 0, y: 30, scale: 0.95, rotateX: -10 }} transition={{ type: 'spring', stiffness: 280, damping: 24 }} className="modern-card relative w-full max-w-5xl overflow-hidden rounded-[2rem] p-2 shadow-2xl" onClick={(event) => event.stopPropagation()} style={{ perspective: 1000 }}>
          <iframe src={artworkUrl} className="h-[78vh] w-full rounded-[1.5rem] border-0" title="Project preview" allowFullScreen />
          <motion.button whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }} onClick={onClose} className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-xl bg-[#090e1c]/90 text-white shadow-xl backdrop-blur-md hover:bg-violet-600" aria-label="Close preview">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </motion.button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const SectionTitle = ({ eyebrow, title, accent, copy }) => (
  <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
    <div>
      <motion.span variants={reveal} className="section-kicker">{eyebrow}</motion.span>
      <motion.h2 variants={reveal} className="mt-4 text-4xl font-black tracking-[-0.055em] text-white sm:text-5xl md:text-6xl">{title} <span className="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">{accent}</span></motion.h2>
    </div>
    {copy && <motion.p variants={reveal} className="max-w-md text-base font-medium leading-relaxed text-slate-400 md:text-right">{copy}</motion.p>}
  </motion.div>
);

const Home = () => {
  const [artworkUrl, setArtworkUrl] = useState('');
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="min-h-screen overflow-x-hidden text-slate-100 selection:bg-violet-500/40 selection:text-white">
      <SEO
        title="Gimhana Deshapriya | Full-Stack Web Developer in Sri Lanka"
        description="Portfolio of Gimhana Deshapriya, a full-stack web developer and UI/UX designer building React, PHP, Node.js, MySQL, admin systems, and responsive digital products."
        path="/"
        schema={{ '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: 'Gimhana Deshapriya Portfolio', inLanguage: 'en-LK' }}
      />
      <Background />
      <main>
        <section className="relative mx-auto flex min-h-screen max-w-7xl items-center px-4 pb-20 pt-32 sm:px-6 lg:px-8">
          <div className="grid w-full items-center gap-12 lg:grid-cols-[1.08fr_.92fr] lg:gap-16">
            <motion.div style={{ y: heroY, opacity: heroOpacity }} initial="hidden" animate="visible" variants={staggerContainer} className="relative z-20">
              <motion.div variants={reveal} whileHover={{ scale: 1.05 }} className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-xs font-bold text-slate-300 backdrop-blur-xl cursor-pointer hover:bg-white/10 transition-colors">
                <span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" /></span>
                Available for meaningful digital work
              </motion.div>
              <motion.p variants={reveal} className="section-kicker mb-5">Full-stack developer · UI/UX designer</motion.p>
              <motion.h1 variants={reveal} className="cinematic-title max-w-3xl text-5xl font-black leading-[0.92] tracking-[-0.07em] text-white sm:text-6xl md:text-7xl xl:text-[5.6rem]">
                Engineering digital products with <motion.span animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }} transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }} className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-300 bg-[length:200%_200%] bg-clip-text py-2 text-transparent">clarity and impact.</motion.span>
              </motion.h1>
              <motion.p variants={reveal} className="mt-7 max-w-2xl text-lg font-medium leading-8 text-slate-400 sm:text-xl">I’m Gimhana Deshapriya—an Information Technology graduate building responsive web platforms, dependable backend systems, and thoughtful user experiences.</motion.p>
              <motion.div variants={reveal} className="mt-9 flex flex-wrap gap-4">
                <Link to="/projects"><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Button primary>Explore selected work <span aria-hidden="true">↗</span></Button></motion.div></Link>
                <Link to="/contact"><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Button secondary>Start a conversation</Button></motion.div></Link>
              </motion.div>
              <motion.div variants={staggerContainer} className="mt-12 grid max-w-2xl grid-cols-3 gap-3">
                {[['Full-stack', 'Product engineering'], ['UI/UX', 'Interface systems'], ['MySQL', 'Data architecture']].map(([value, label], i) => (
                  <motion.div key={value} variants={reveal} whileHover={{ y: -5, backgroundColor: 'rgba(255, 255, 255, 0.08)' }} className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 backdrop-blur-lg transition-colors"><strong className="block text-sm font-black text-white sm:text-base">{value}</strong><span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</span></motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }} animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} className="relative mx-auto w-full max-w-xl lg:max-w-none">
              <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="absolute inset-x-14 bottom-14 top-20 rounded-full bg-violet-500/15 blur-3xl" />
              <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="relative z-10">
                <img src="/profile.png" alt="Gimhana Deshapriya" className="mx-auto h-auto w-[142%] max-w-none -translate-x-[14.5%] object-contain drop-shadow-[0_0_40px_rgba(139,92,246,0.3)]" />
              </motion.div>
              <div className="pointer-events-none absolute inset-0 hidden lg:block">
                {orbitSkills.map((skill, index) => (
                  <motion.div key={skill.name} className={`absolute ${skill.position}`} animate={{ y: [0, -12, 0], x: [0, index % 2 ? -5 : 5, 0], rotate: [0, index % 2 ? -10 : 10, 0] }} transition={{ duration: 4.5 + index * 0.45, repeat: Infinity, ease: 'easeInOut' }}>
                    <div className="modern-card grid h-14 w-14 place-items-center rounded-2xl bg-white/5 backdrop-blur-md shadow-lg shadow-violet-500/10 border border-white/10"><img src={`/icons/${skill.name}-${['php', 'mysql'].includes(skill.name) ? 'plain' : 'original'}.svg`} alt="" className="h-7 w-7" /></div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="border-y border-white/[0.08] bg-white/[0.018] py-8 overflow-hidden">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-5 px-4 sm:px-6 lg:justify-between lg:px-8">
            {['React', 'Node.js', 'PHP', 'JavaScript', 'MySQL', 'MongoDB'].map((tech, index) => (
              <motion.span key={tech} variants={reveal} whileHover={{ y: -5, scale: 1.1, color: '#c084fc', textShadow: '0 0 20px rgba(192,132,252,0.5)' }} className="cursor-default text-sm font-black uppercase tracking-[0.18em] text-slate-500 transition-colors duration-300">{tech}</motion.span>
            ))}
          </motion.div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8 lg:py-36">
          <SectionTitle eyebrow="Experience signal" title="A journey built across" accent="technology and design." copy="Formal technology training, enterprise experience, and independent product work shape how I approach each build." />
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="mb-5 text-xs font-black uppercase tracking-[0.28em] text-cyan-300">Education</p>
              <div className="space-y-5">
                {education.map((item, index) => (
                  <motion.article key={item.title} initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ delay: index * 0.15, duration: 0.6, type: "spring", bounce: 0.4 }} whileHover={{ y: -8, scale: 1.02, boxShadow: '0 20px 40px -15px rgba(34,211,238,0.15)' }} className="modern-card rounded-2xl p-7 sm:p-8 border border-white/5 bg-white/[0.02] transition-all">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">{item.period}</span><h3 className="mt-4 text-xl font-black tracking-tight text-white">{item.title}</h3><p className="mt-2 text-sm font-bold text-violet-300">{item.organization}</p><p className="mt-4 leading-7 text-slate-400">{item.description}</p>
                  </motion.article>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-5 text-xs font-black uppercase tracking-[0.28em] text-violet-300">Professional work</p>
              <div className="space-y-5">
                {experience.map((item, index) => (
                  <motion.article key={item.title} initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ delay: index * 0.15, duration: 0.6, type: "spring", bounce: 0.4 }} whileHover={{ y: -8, scale: 1.02, boxShadow: '0 20px 40px -15px rgba(139,92,246,0.15)' }} className="modern-card rounded-2xl p-7 sm:p-8 border border-white/5 bg-white/[0.02] transition-all">
                    <div className="flex flex-wrap items-center justify-between gap-3"><span className="text-[10px] font-black uppercase tracking-[0.2em] text-violet-300">{item.period}</span><div className="flex gap-3">{item.links.map((link) => <motion.button whileHover={{ scale: 1.05, color: '#67e8f9' }} whileTap={{ scale: 0.95 }} key={link.url} onClick={() => setArtworkUrl(link.url)} className="text-[10px] font-black uppercase tracking-wider text-slate-500 hover:text-cyan-300 transition-colors">View {link.label} ↗</motion.button>)}</div></div>
                    <h3 className="mt-4 text-xl font-black tracking-tight text-white">{item.title}</h3><p className="mt-2 text-sm font-bold text-violet-300">{item.organization}</p><p className="mt-4 leading-7 text-slate-400">{item.description}</p>
                  </motion.article>
                ))}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }} className="rounded-2xl border border-dashed border-white/10 p-8 text-center transition-colors"><p className="text-sm font-bold text-slate-400">See the complete professional timeline and leadership work.</p><Link to="/about" className="mt-4 inline-flex text-xs font-black uppercase tracking-[0.2em] text-cyan-300 hover:text-white transition-colors">Explore my story →</Link></motion.div>
              </div>
            </div>
          </div>
        </section>

        <section className="theme-panel relative border-y border-white/[0.07] bg-[#070b16]/70 py-28 lg:py-36 overflow-hidden">
          <motion.div animate={{ backgroundPosition: ['0px 0px', '100px 100px'] }} transition={{ repeat: Infinity, duration: 20, ease: 'linear' }} className="absolute inset-0 bg-grid opacity-[0.08]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTitle eyebrow="Skills lab" title="Tools selected for" accent="real product work." copy="A practical toolkit spanning interface engineering, backend development, databases, mobile foundations, and visual design." />
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={staggerContainer} className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {skills.map((skill) => (
                <motion.div key={skill.name} variants={reveal} whileHover={{ y: -10, scale: 1.05, zIndex: 10, boxShadow: '0 25px 50px -12px rgba(139,92,246,0.25)' }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="modern-card group relative rounded-2xl p-6 bg-gradient-to-b from-white/[0.05] to-transparent hover:border-violet-500/30">
                  <motion.div className="absolute inset-0 rounded-2xl bg-violet-500/10 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
                  <div className="relative grid h-12 w-12 place-items-center rounded-xl bg-white/[0.05] ring-1 ring-inset ring-white/[0.06] transition-all group-hover:bg-violet-500/20 group-hover:ring-violet-500/50 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]"><img src={`/icons/${skill.icon}-original.svg`} onError={(event) => { event.currentTarget.src = `/icons/${skill.icon}-plain.svg`; }} alt="" className="h-7 w-7 grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110" /></div>
                  <p className="relative mt-5 font-black text-white group-hover:text-violet-200 transition-colors">{skill.name}</p><p className="relative mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500 group-hover:text-violet-400/80 transition-colors">{skill.group}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

          <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
            <SectionTitle eyebrow="Ways I can help" title="From the first screen" accent="to the system behind it." copy="Product engineering grounded in your existing work across web platforms, administration workflows, and interface design." />
            <div className="grid gap-4 md:grid-cols-3">
              {[
                ['01', 'Web platforms', 'Responsive product experiences built with React and reliable backend services.'],
                ['02', 'Admin systems', 'Role-based portals, data workflows, and practical tools that help teams run their work.'],
                ['03', 'Interface design', 'Clear, accessible interfaces shaped around the people who use them.'],
              ].map(([number, title, description], index) => (
                <motion.article key={title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ delay: index * 0.1 }} whileHover={{ y: -6 }} className="modern-card rounded-3xl p-7 sm:p-8">
                  <span className="text-xs font-bold tracking-[.2em] text-violet-300">{number}</span>
                  <h3 className="mt-8 text-2xl font-bold tracking-tight text-white">{title}</h3>
                  <p className="mt-4 leading-7 text-slate-400">{description}</p>
                </motion.article>
              ))}
            </div>
          </section>

          <GitHubSpotlight />

          <section id="achievements" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8 lg:pb-32">
            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <span className="section-kicker">Service · leadership · recognition</span>
                <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-[-0.055em] text-white sm:text-5xl">A journey of <span className="text-violet-300">impact and service.</span></h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400">Proud and honored to contribute to a team recognized for strengthening Leoism through impactful service, innovation, and digital transformation. Grateful to everyone who supported the journey.</p>
              </div>
              <a href="https://www.linkedin.com/in/gimhana-deshapriya/" target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-violet-300/40 hover:text-violet-200">View my LinkedIn <span aria-hidden="true">↗</span></a>
            </div>

            <div className="grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="modern-card flex flex-col justify-between rounded-3xl p-7 sm:p-9">
                <div>
                  <span className="text-sm font-semibold text-violet-200">A team effort</span>
                  <p className="mt-5 text-5xl font-bold tracking-tight text-white">100<span className="text-violet-300">+</span></p>
                  <p className="mt-1 text-sm text-slate-400">impactful projects completed</p>
                  <p className="mt-7 text-3xl font-bold tracking-tight text-white">LKR 10.2M</p>
                  <p className="mt-1 text-sm text-slate-400">approximate total project value</p>
                </div>
                <p className="mt-8 border-t border-white/10 pt-5 text-sm leading-6 text-slate-400">A collective achievement that placed the club among the district’s highest-performing Leo Clubs.</p>
              </motion.div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ['Best Project for Betterment of Leoism', 'District recognition'],
                  ['Best Innovative Project', 'District recognition'],
                  ['Most Outstanding Innovative Project', 'Additional recognition'],
                  ['Most Outstanding Digital Transformation Campaign', 'District recognition'],
                  ['Most Innovative Project', 'Multiple-district recognition'],
                  ['1st Runner-Up · Best Project for Betterment of Leoism', 'Multiple-district recognition'],
                ].map(([title, level], index) => (
                  <motion.article key={title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.06 }} className="modern-card flex min-h-32 items-start gap-4 rounded-2xl p-5 sm:p-6">
                    <span aria-hidden="true" className="mt-0.5 text-xl">🏆</span>
                    <div><h3 className="font-semibold leading-6 text-white">{title}</h3><p className="mt-2 text-[10px] font-bold uppercase tracking-[.16em] text-violet-300">{level}</p></div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8 lg:py-36">
          <motion.div initial={{ opacity: 0, y: 50, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.8, type: "spring", bounce: 0.3 }} whileHover={{ boxShadow: '0 0 50px -12px rgba(139,92,246,0.3)' }} className="modern-card relative overflow-hidden rounded-[2rem] p-8 sm:p-12 lg:p-16 transition-shadow duration-500">
            <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />
            <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }} className="absolute -bottom-36 left-1/3 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />

            <div className="relative grid items-end gap-10 lg:grid-cols-[1fr_auto]">
              <div>
                <motion.span initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="section-kicker">Start a conversation</motion.span>
                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-5 max-w-4xl text-4xl font-black tracking-[-0.055em] text-white sm:text-5xl lg:text-6xl">Have a useful idea? Let’s turn it into a clear, dependable digital product.</motion.h2>
                <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">Available for web platforms, admin systems, process automation, and interface design.</motion.p>
              </div>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-4 lg:flex-col">
                <a href="mailto:gimhandeshapriya567@gmail.com"><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Button primary>Email me ↗</Button></motion.div></a>
                <Link to="/contact"><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Button secondary>Contact details</Button></motion.div></Link>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-white/[0.07] py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-4 text-center text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 sm:px-6 md:flex-row lg:px-8">
          <motion.p whileHover={{ color: '#fff' }} className="transition-colors">© 2026 Gimhana Deshapriya</motion.p>
          <motion.p whileHover={{ color: '#fff' }} className="transition-colors">Engineered with clarity · Designed with intent</motion.p>
        </div>
      </footer>
      <ArtworkPopup isOpen={Boolean(artworkUrl)} onClose={() => setArtworkUrl('')} artworkUrl={artworkUrl} />
    </div>
  );
};

export default Home;
