import React from 'react';
import { motion } from 'framer-motion';
import Background from '../components/Background';

const ContactMe = () => {

  return (
    <div className="min-h-screen text-slate-900 selection:bg-purple-100 selection:text-purple-900 overflow-x-hidden font-main">
      <Background />
      <title>Connect | Gimhana Deshapriya</title>
      <meta name="description" content="Inquire about collaborations or digital architecture." />

      <main className="container mx-auto px-4 py-32 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-start">

          {/* Information Column */}
          <div className="space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-xs font-black tracking-[0.5em] text-purple-600 uppercase mb-8 block">Global Inquiry</span>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.8] text-slate-950 font-heading">
                Start a <br />
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Dialogue.</span>
              </h1>
              <p className="mt-12 text-xl text-slate-600 font-medium leading-relaxed max-w-md">
                Available for strategic partnerships and high-impact digital engineering roles.
              </p>
            </motion.div>

            <div className="space-y-10">
              <div className="group">
                <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-2">Direct Email</p>
                <a href="mailto:gimhandeshapriya567@gmail.com" className="text-xl md:text-2xl font-bold text-slate-950 hover:text-purple-600 transition-colors tracking-tighter">
                  gimhandeshapriya567@gmail.com
                </a>
              </div>
              <div className="group">
                <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-2">Direct Phone</p>
                <a href="tel:+94768582057" className="text-xl md:text-2xl font-bold text-slate-950 hover:text-purple-600 transition-colors tracking-tighter">
                  +94 76 8582 057
                </a>
              </div>
              <div className="group">
                <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-2">Digital Home</p>
                <a href="https://www.gimhan.me" target="_blank" rel="noopener noreferrer" className="text-xl md:text-2xl font-bold text-slate-950 hover:text-purple-600 transition-colors tracking-tighter">
                  www.gimhan.me
                </a>
              </div>
              <div className="group">
                <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-2">Global HQ</p>
                <p className="text-xl md:text-2xl font-bold text-slate-950 tracking-tighter">
                  257, Indolamulla, Dompe, Sri Lanka
                </p>
              </div>
            </div>

            {/* Social Grid */}
            <div className="flex gap-10 opacity-30">
              {['LinkedIn', 'GitHub', 'X'].map(social => (
                <span key={social} className="text-xs font-black tracking-[0.3em] uppercase">{social}</span>
              ))}
            </div>
          </div>

          {/* Status Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass p-12 md:p-16 rounded-2xl shadow-2xl relative overflow-hidden border border-slate-100/50 space-y-8"
          >
            <div className="space-y-4">
              <span className="text-[10px] font-black tracking-widest uppercase text-slate-400 font-main">Operational Status</span>
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-2xl md:text-3xl font-black text-slate-950 tracking-tight font-heading">Accepting New Ventures</span>
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
                className="w-full inline-flex items-center justify-center py-5 bg-slate-950 text-white font-black tracking-[0.2em] uppercase rounded-lg hover:bg-purple-600 transition-all duration-500 shadow-lg hover:shadow-purple-500/10 font-main"
              >
                Initiate Dialogue
              </a>
            </div>

            <div className="absolute -bottom-10 -left-10 w-full h-full bg-indigo-500/5 rounded-2xl -z-10" />
          </motion.div>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="py-20 border-t border-slate-100 mt-20">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-[10px] font-black tracking-[0.4em] text-slate-300 uppercase">
          <p>© 2025</p>
          <p>Engineered for Impact</p>
        </div>
      </footer>
    </div>
  );
};

export default ContactMe;
