import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Background from '../components/Background';
import { useToast } from '../contexts/ToastContext';

const ContactMe = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Logic for submission (simulated for now, keeping existing handlers)
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.showSuccess('Communication Synchronized. I will be in touch shortly.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.showError('Transmission Interrupted. Please retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen text-slate-900 selection:bg-purple-100 selection:text-purple-900 overflow-x-hidden font-main">
      <Background />
      <Helmet>
        <title>Connect | Gimhana Deshapriya</title>
        <meta name="description" content="Inquire about collaborations or digital architecture." />
      </Helmet>

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
                <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-2">Direct Channel</p>
                <a href="mailto:gimhandeshapriya567@gmail.com" className="text-xl md:text-2xl font-bold text-slate-950 hover:text-purple-600 transition-colors tracking-tighter">
                  gimhanadeshapriya567@gmail.com
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

          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="glass p-12 md:p-16 rounded-[4rem] shadow-2xl relative z-10">
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-widest uppercase text-slate-400 pl-4">Your Identity</label>
                  <input
                    type="text" name="name" value={formData.name} onChange={handleChange} required
                    className="w-full px-8 py-5 rounded-3xl bg-slate-50 border-transparent focus:bg-white focus:border-purple-200 transition-all font-bold text-lg placeholder:text-slate-300"
                    placeholder="Full Name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-widest uppercase text-slate-400 pl-4">Inquiry Pathway</label>
                  <input
                    type="email" name="email" value={formData.email} onChange={handleChange} required
                    className="w-full px-8 py-5 rounded-3xl bg-slate-50 border-transparent focus:bg-white focus:border-purple-200 transition-all font-bold text-lg placeholder:text-slate-300"
                    placeholder="Email Address"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-widest uppercase text-slate-400 pl-4">Architecture Brief</label>
                  <textarea
                    name="message" value={formData.message} onChange={handleChange} rows="5" required
                    className="w-full px-8 py-5 rounded-3xl bg-slate-50 border-transparent focus:bg-white focus:border-purple-200 transition-all font-bold text-lg placeholder:text-slate-300 resize-none"
                    placeholder="Define your requirements..."
                  />
                </div>
                <button
                  type="submit" disabled={isSubmitting}
                  className="w-full py-6 bg-slate-950 text-white font-black tracking-[0.4em] uppercase rounded-3xl hover:bg-purple-600 transition-all duration-700 shadow-2xl hover:shadow-purple-500/20 disabled:opacity-50"
                >
                  {isSubmitting ? 'Transmitting...' : 'Synchronize'}
                </button>
              </form>
            </div>
            {/* Background Accent */}
            <div className="absolute -bottom-10 -left-10 w-full h-full bg-indigo-500/10 rounded-[4rem] blur-[100px] -z-10" />
          </motion.div>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="py-20 border-t border-slate-100 mt-20">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-[10px] font-black tracking-[0.4em] text-slate-300 uppercase">
          <p>© 2024</p>
          <p>Engineered for Impact</p>
        </div>
      </footer>
    </div>
  );
};

export default ContactMe;