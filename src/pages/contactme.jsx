import React from 'react';
import { motion } from 'framer-motion';
import Background from '../components/Background';
import SEO from '../components/SEO';

const reveal = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const ContactMe = () => {
  return (
    <div className="min-h-screen text-slate-100 selection:bg-violet-500/40 selection:text-white overflow-x-hidden font-main">
      <Background />
      <SEO
        title="Contact Gimhana Deshapriya | Full-Stack Web Development"
        description="Contact Gimhana Deshapriya for full-stack web development, React and PHP systems, MySQL databases, admin portals, automation, and UI/UX design."
        path="/contact"
        schema={{ '@type': 'ContactPage', name: 'Contact Gimhana Deshapriya', url: 'https://www.gimhan.me/contact' }}
      />

      <main className="container mx-auto px-4 py-32 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Information Column */}
          <div className="space-y-16">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.span variants={reveal} className="text-xs font-black tracking-[0.5em] text-cyan-400 uppercase mb-8 block">Global Inquiry</motion.span>
              <motion.h1 variants={reveal} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-white font-heading">
                Start a <br />
                <motion.span animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }} transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }} className="italic text-transparent bg-clip-text bg-[length:200%_200%] bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 pb-2 block">Dialogue.</motion.span>
              </motion.h1>
              <motion.p variants={reveal} className="mt-8 text-lg md:text-xl text-slate-400 font-medium leading-relaxed max-w-md">
                Available for strategic partnerships and high-impact digital engineering roles. Let's build something extraordinary.
              </motion.p>
            </motion.div>

            <motion.div
              className="modern-card rounded-2xl p-6 sm:p-8 space-y-4 border border-white/5 bg-white/[0.02] backdrop-blur-xl"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {[
                { label: 'Direct Email', value: 'gimhandeshapriya567@gmail.com', href: 'mailto:gimhandeshapriya567@gmail.com' },
                { label: 'Direct Phone', value: '+94 76 8582 057', href: 'tel:+94768582057' },
                { label: 'Digital Home', value: 'www.gimhan.web.lk', href: 'https://www.gimhan.web.lk' },
                { label: 'Global HQ', value: '257, Indolamulla, Dompe, Sri Lanka', href: null }
              ].map((item, index) => (
                <motion.div key={index} variants={reveal} whileHover={{ x: 10, backgroundColor: 'rgba(139,92,246,0.05)' }} className="group rounded-xl p-4 transition-colors">
                  <p className="text-[10px] font-black tracking-widest text-slate-500 uppercase mb-2 group-hover:text-violet-400 transition-colors">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} target={item.label === 'Digital Home' ? '_blank' : '_self'} rel="noreferrer" className="text-xl md:text-2xl font-bold text-white hover:text-cyan-300 transition-colors tracking-tighter break-all">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-xl md:text-2xl font-bold text-white tracking-tighter">
                      {item.value}
                    </p>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Social Grid */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex gap-10">
              {['LinkedIn', 'GitHub', 'X'].map((social, i) => (
                <motion.a whileHover={{ y: -5, color: '#22d3ee' }} href="#" key={social} className="text-xs font-black tracking-[0.3em] uppercase text-slate-500 hover:text-cyan-400 transition-colors">{social}</motion.a>
              ))}
            </motion.div>
          </div>

          {/* Status Column */}
          <motion.div
            initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.4, type: 'spring', bounce: 0.4 }}
            whileHover={{ y: -10, boxShadow: '0 25px 50px -12px rgba(139,92,246,0.25)' }}
            className="modern-card relative overflow-hidden p-10 md:p-14 rounded-[2.5rem] space-y-10 border border-white/[0.08] bg-white/[0.03] backdrop-blur-2xl"
          >
            <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-violet-600/30 blur-3xl pointer-events-none" />
            <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }} className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <span className="text-[10px] font-black tracking-widest uppercase text-slate-500 font-main">Operational Status</span>
              <div className="flex items-center gap-4">
                <span className="relative flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400"></span>
                </span>
                <span className="text-2xl md:text-3xl font-black text-white tracking-tight font-heading">Accepting New Ventures</span>
              </div>
            </div>

            <div className="space-y-8 pt-10 border-t border-white/10 relative z-10">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <span className="text-[10px] font-black tracking-widest uppercase text-slate-500 font-main">Timezone</span>
                  <p className="text-base font-bold text-slate-300 font-main">GMT +5:30 (SLST)</p>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-black tracking-widest uppercase text-slate-500 font-main">Response Window</span>
                  <p className="text-base font-bold text-slate-300 font-main">Within 12 Hours</p>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-black tracking-widest uppercase text-slate-500 font-main">Primary Focus Areas</span>
                <p className="text-base font-bold text-slate-300 leading-relaxed font-main">
                  Enterprise Portals, Process Automation Pipelines, Responsive System Architectures.
                </p>
              </div>
            </div>

            <div className="pt-6 relative z-10">
              <a href="mailto:gimhandeshapriya567@gmail.com" className="block w-full">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                  <button className="relative w-full overflow-hidden rounded-xl bg-white/[0.05] border border-white/10 px-8 py-5 font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-white/[0.1] hover:border-violet-500/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                    <span className="relative z-10">Initiate Dialogue ↗</span>
                    <motion.div className="absolute inset-0 z-0 bg-gradient-to-r from-violet-600/20 to-cyan-500/20 opacity-0 transition-opacity hover:opacity-100" />
                  </button>
                </motion.div>
              </a>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="py-20 border-t border-white/[0.07] mt-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-[10px] font-black tracking-[0.4em] text-slate-500 uppercase">
          <p>© 2026</p>
          <p>Engineered for Impact</p>
        </div>
      </footer>
    </div>
  );
};

export default ContactMe;
