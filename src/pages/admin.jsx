import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Background from '../components/Background';
import { projectService } from '../utils/projectService';
import { useToast } from '../contexts/ToastContext';
import { Link } from 'react-router-dom';
import { storage } from '../firebase';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';


// Hardcoded Default PIN
const ADMIN_PIN = process.env.REACT_APP_ADMIN_PIN || '1234';

const Admin = () => {
  const toast = useToast();
  
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [isPinError, setIsPinError] = useState(false);

  // Projects state
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form states
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    period: '',
    description: '',
    category: 'Web Development',
    image: '',
    technologiesText: '',
    gallery: [],
    links: []
  });
  const [linkInput, setLinkInput] = useState({ label: '', url: '' });
  const [isSaving, setIsSaving] = useState(false);

  // Upload/Compression staging states
  const [isCoverUploading, setIsCoverUploading] = useState(false);
  const [isGalleryUploading, setIsGalleryUploading] = useState(false);
  const [galleryUrlInput, setGalleryUrlInput] = useState('');

  // Load projects once authenticated
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const loadProjects = async () => {
      try {
        setIsLoading(true);
        const data = await projectService.getProjects();
        setProjects(data);
      } catch (err) {
        toast.showError('Failed to fetch projects.');
      } finally {
        setIsLoading(false);
      }
    };
    loadProjects();
  }, [isAuthenticated, toast]);

  // Handle PIN input digit tap
  const handlePinTap = (digit) => {
    if (enteredPin.length >= 4) return;
    const newPin = enteredPin + digit;
    setEnteredPin(newPin);

    if (newPin.length === 4) {
      if (newPin === ADMIN_PIN) {
        toast.showSuccess('Console Unlocked. Synchronizing Database.');
        setTimeout(() => setIsAuthenticated(true), 300);
      } else {
        setIsPinError(true);
        toast.showError('Access Denied. Incorrect Passcode.');
        setTimeout(() => {
          setEnteredPin('');
          setIsPinError(false);
        }, 600);
      }
    }
  };

  const handleBackspace = () => {
    setEnteredPin(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    setEnteredPin('');
  };

  // Image Compression Utility (Canvas-based)
  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 700; // Ultra-optimized for Firestore document size limits (20-30KB per image)
          const MAX_HEIGHT = 700;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // 0.6 Quality JPEG Compression (creates highly optimized small payloads for Firestore documents)
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.6);
          resolve(compressedBase64);
        };
        img.onerror = (err) => reject(err);
        img.src = event.target.result; // Set src AFTER assigning event handlers to prevent race conditions on fast sync data URLs
      };
      reader.onerror = (err) => reject(err);
    });
  };

  // Cover Photo File Input Handler (Directly stages to Firestore payload)
  const handleCoverFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsCoverUploading(true);
    try {
      toast.showSuccess('Optimizing cover image for Firestore...');
      const compressedData = await compressImage(file);
      setFormData(prev => ({ ...prev, image: compressedData }));
      toast.showSuccess('Cover image optimized and staged successfully for Firestore!');
    } catch (err) {
      toast.showError('Image compression failed.');
    } finally {
      setIsCoverUploading(false);
      e.target.value = ''; // clear input
    }
  };

  // Multi-Image Gallery Files Input Handler (Directly stages to Firestore payload)
  const handleGalleryFilesChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsGalleryUploading(true);
    toast.showSuccess(`Optimizing ${files.length} screenshots for Firestore...`);

    let loadedCount = 0;
    const uploadedUrls = [];

    for (const file of files) {
      try {
        const compressedData = await compressImage(file);
        uploadedUrls.push(compressedData);
        loadedCount++;
      } catch (err) {
        console.error(`Failed to stage ${file.name}:`, err);
      }
    }

    setFormData(prev => ({
      ...prev,
      gallery: [...(prev.gallery || []), ...uploadedUrls]
    }));

    toast.showSuccess(`Staged ${loadedCount} optimized gallery screenshot(s) for Firestore!`);
    setIsGalleryUploading(false);
    e.target.value = ''; // clear input
  };

  const handleAddGalleryUrl = () => {
    if (!galleryUrlInput) return;
    setFormData(prev => ({
      ...prev,
      gallery: [...(prev.gallery || []), galleryUrlInput]
    }));
    setGalleryUrlInput('');
    toast.showSuccess('Gallery screenshot link added.');
  };

  const handleRemoveGalleryImage = (idx) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== idx)
    }));
    toast.showSuccess('Gallery screenshot removed.');
  };

  // Form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddLink = () => {
    if (!linkInput.label || !linkInput.url) {
      toast.showError('Fill both Label and Link URL.');
      return;
    }
    setFormData(prev => ({
      ...prev,
      links: [...prev.links, { ...linkInput }]
    }));
    setLinkInput({ label: '', url: '' });
  };

  const handleRemoveLink = (idx) => {
    setFormData(prev => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== idx)
    }));
  };

  // Prepopulate form for editing
  const handleEditInit = async (project) => {
    setIsEditing(true);
    setEditingId(project.id);
    
    // Set basic text fields and cover image immediately for zero-lag UI feedback
    setFormData({
      title: project.title,
      period: project.period,
      description: project.description,
      category: project.category,
      image: project.image,
      technologiesText: project.technologies.join(', '),
      gallery: [], // Loaded asynchronously below
      links: project.links || []
    });

    try {
      toast.showSuccess('Loading project screenshots...');
      const fullProject = await projectService.getProject(project.id);
      if (fullProject) {
        setFormData(prev => ({
          ...prev,
          gallery: fullProject.gallery || []
        }));
        toast.showSuccess('Screenshots loaded successfully!');
      }
    } catch (err) {
      console.error('Failed to load screenshots:', err);
      toast.showError('Failed to load screenshots for editing.');
    }
    
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // Delete project handler
  const handleDelete = async (projectId) => {
    if (!window.confirm('Are you absolutely sure you want to delete this project?')) return;
    try {
      await projectService.deleteProject(projectId);
      setProjects(prev => prev.filter(p => p.id !== projectId));
      toast.showSuccess('Project deleted successfully.');
      if (editingId === projectId) handleCancel();
    } catch (err) {
      toast.showError('Failed to delete project.');
    }
  };

  // Save project handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.period || !formData.description) {
      toast.showError('Required fields are missing.');
      return;
    }
    
    setIsSaving(true);
    try {
      const technologies = formData.technologiesText
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0);

      const payload = {
        title: formData.title,
        period: formData.period,
        description: formData.description,
        category: formData.category,
        image: formData.image || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
        gallery: formData.gallery || [],
        technologies,
        links: formData.links
      };

      if (isEditing) {
        payload.id = editingId;
      }

      const saved = await projectService.saveProject(payload);
      
      if (isEditing) {
        setProjects(prev => prev.map(p => p.id === saved.id ? saved : p));
        toast.showSuccess('Project updated successfully.');
      } else {
        setProjects(prev => [...prev, saved]);
        toast.showSuccess('Project created successfully.');
      }
      
      handleCancel();
    } catch (err) {
      toast.showError('Failed to save project.');
    } finally {
      setIsSaving(false);
    }
  };

  // Reset form
  const handleCancel = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      title: '',
      period: '',
      description: '',
      category: 'Web Development',
      image: '',
      technologiesText: '',
      gallery: [],
      links: []
    });
    setLinkInput({ label: '', url: '' });
  };

  // Reset database back to default
  const handleResetDb = async () => {
    if (!window.confirm('CRITICAL ACTION: Reset all database items back to default? All custom entries will be lost.')) return;
    try {
      setIsLoading(true);
      const data = await projectService.resetToDefault();
      setProjects(data);
      toast.showSuccess('Database restored to default projects.');
      handleCancel();
    } catch (err) {
      toast.showError('Failed to reset database.');
    } finally {
      setIsLoading(false);
    }
  };

  // Compute metrics
  const totalProjects = projects.length;
  const categoriesCount = new Set(projects.map(p => p.category)).size;
  const techStackSize = new Set(projects.flatMap(p => p.technologies)).size;

  return (
    <div className="min-h-screen text-slate-900 selection:bg-purple-100 selection:text-purple-900 overflow-x-hidden font-main">
      <Background />
      <title>Console Console | Gimhana Deshapriya</title>

      <main className="container mx-auto px-4 py-32 max-w-7xl relative z-10">
        
        {/* Passcode Security Overlay Grid */}
        <AnimatePresence>
          {!isAuthenticated && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-xl"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={
                  isPinError
                    ? { x: [0, -10, 10, -10, 10, -10, 10, 0], scale: 1, opacity: 1 }
                    : { scale: 1, opacity: 1 }
                }
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="w-full max-w-md glass p-10 rounded-[3rem] text-center border border-white/10 flex flex-col items-center space-y-8"
              >
                {/* Vault Shield Header */}
                <div className="space-y-3">
                  <div className="w-16 h-16 rounded-3xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mx-auto animate-pulse">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-black text-white tracking-tighter uppercase font-heading">Secure Vault</h2>
                  <p className="text-xs font-semibold text-slate-400 tracking-wider font-main">
                    Enter Passcode to Initialize Management Console
                  </p>
                </div>

                {/* Secret dots grid */}
                <div className="flex justify-center gap-4 py-4">
                  {[0, 1, 2, 3].map((idx) => (
                    <motion.div
                      key={idx}
                      className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                        idx < enteredPin.length
                          ? 'bg-purple-500 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.8)] scale-110'
                          : 'border-white/20 bg-white/5'
                      }`}
                      animate={idx < enteredPin.length ? { scale: [1, 1.2, 1] } : {}}
                    />
                  ))}
                </div>

                {/* PIN keypad grid */}
                <div className="grid grid-cols-3 gap-4 w-full max-w-xs pt-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <button
                      key={num}
                      onClick={() => handlePinTap(num.toString())}
                      className="h-16 rounded-2xl bg-white/5 border border-white/5 text-white font-bold text-xl hover:bg-purple-600/30 hover:border-purple-500/50 hover:scale-105 active:scale-95 transition-all duration-200"
                    >
                      {num}
                    </button>
                  ))}
                  <button
                    onClick={handleClear}
                    className="h-16 rounded-2xl bg-white/5 border border-white/5 text-slate-400 font-semibold text-xs hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 active:scale-95 transition-all duration-200"
                  >
                    CLEAR
                  </button>
                  <button
                    onClick={() => handlePinTap('0')}
                    className="h-16 rounded-2xl bg-white/5 border border-white/5 text-white font-bold text-xl hover:bg-purple-600/30 hover:border-purple-500/50 hover:scale-105 active:scale-95 transition-all duration-200"
                  >
                    0
                  </button>
                  <button
                    onClick={handleBackspace}
                    className="h-16 rounded-2xl bg-white/5 border border-white/5 text-slate-400 font-semibold text-xs hover:bg-white/10 active:scale-95 transition-all duration-200 flex items-center justify-center"
                    aria-label="backspace"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414A2 2 0 0010.828 19h7.344a2 2 0 002-2V7a2 2 0 00-2-2h-7.344a2 2 0 00-1.414.586L3 12z" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dashboard Console Layout */}
        {isAuthenticated && (
          <div className="space-y-16">
            
            {/* Header branding */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-slate-100">
              <div className="space-y-2">
                <span className="text-[10px] font-black tracking-[0.5em] text-purple-600 uppercase block pl-1">ADMINISTRATIVE DECK</span>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none text-slate-950 font-heading">
                  Dynamic <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Console.</span>
                </h1>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/projects"
                  className="px-6 py-3.5 bg-slate-100 text-slate-700 font-black tracking-widest text-[9px] uppercase rounded-xl hover:bg-slate-200 transition-colors shadow-sm"
                >
                  View Archive
                </Link>
                <button
                  onClick={handleResetDb}
                  className="px-6 py-3.5 bg-red-50 text-red-600 font-black tracking-widest text-[9px] uppercase rounded-xl hover:bg-red-100 border border-red-100 transition-colors shadow-sm"
                >
                  Restore Defaults
                </button>
              </div>
            </div>

            {/* Metrics cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="glass p-8 rounded-3xl border border-slate-50 relative overflow-hidden group">
                <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-purple-500/5 flex items-center justify-center text-purple-600 border border-purple-500/10">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                </div>
                <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-main">Total Projects</p>
                <h3 className="text-4xl font-black text-slate-900 mt-2 font-heading">{isLoading ? '...' : totalProjects}</h3>
              </div>

              <div className="glass p-8 rounded-3xl border border-slate-50 relative overflow-hidden group">
                <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-indigo-500/5 flex items-center justify-center text-indigo-600 border border-indigo-500/10">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-main">Domain Categories</p>
                <h3 className="text-4xl font-black text-slate-900 mt-2 font-heading">{isLoading ? '...' : categoriesCount}</h3>
              </div>

              <div className="glass p-8 rounded-3xl border border-slate-50 relative overflow-hidden group">
                <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-emerald-500/5 flex items-center justify-center text-emerald-600 border border-emerald-500/10">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                </div>
                <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-main">Technologies Wielded</p>
                <h3 className="text-4xl font-black text-slate-900 mt-2 font-heading">{isLoading ? '...' : techStackSize}</h3>
              </div>
            </div>

            {/* Split layout: Form (CRUD Editor) & Projects List */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Form/CRUD Editor Box - 5 columns */}
              <div className="lg:col-span-5 glass p-10 rounded-[3rem] border border-slate-100/50 space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-950 uppercase tracking-tight font-heading">
                    {isEditing ? 'Modify Project' : 'Add New Project'}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium font-main mt-1">
                    {isEditing ? 'Edit fields below to update current entry.' : 'Populate form parameters to construct an entry.'}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black tracking-widest uppercase text-slate-400 pl-2">Project Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. Tuition Class Management"
                      className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-purple-200 transition-all font-bold placeholder:text-slate-300 text-sm"
                    />
                  </div>

                  {/* Date range & Category */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black tracking-widest uppercase text-slate-400 pl-2">Date / Period</label>
                      <input
                        type="text"
                        name="period"
                        value={formData.period}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. January 2025"
                        className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-purple-200 transition-all font-bold placeholder:text-slate-300 text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black tracking-widest uppercase text-slate-400 pl-2">Domain Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-purple-200 transition-all font-bold text-sm"
                      >
                        <option value="Web Development">Web Development</option>
                        <option value="System Design">System Design</option>
                        <option value="Design">Design</option>
                      </select>
                    </div>
                  </div>

                  {/* Media Section: Cover Image and Gallery (Up to 50 Images) */}
                  <div className="space-y-6 pt-4 border-t border-slate-100">
                    <span className="text-[10px] font-black tracking-widest uppercase text-slate-400 block pl-2">Media Deck</span>
                    
                    {/* A. Cover Image Section */}
                    <div className="glass p-5 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-[9px] font-black tracking-widest uppercase text-purple-600 pl-1">Project Cover Image</label>
                        {formData.image && (
                          <span className="text-[8px] font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-500 uppercase">
                            {formData.image.startsWith('data:') ? 'Firestore Staged (Optimized)' : 'External URL Link'}
                          </span>
                        )}
                      </div>

                      {/* Display thumbnail card if cover exists */}
                      {formData.image && (
                        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-slate-200/50 shadow-inner group">
                          <img
                            src={formData.image}
                            alt="Cover thumbnail"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                            className="absolute top-3 right-3 p-2 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-lg transition-transform hover:scale-105 duration-300"
                            title="Remove cover"
                          >
                            ✕
                          </button>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* URL paste method */}
                        <div className="space-y-1">
                          <span className="text-[7px] font-black tracking-wider uppercase text-slate-400 pl-1">Paste Image URL</span>
                          <input
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleInputChange}
                            placeholder="https://images.unsplash.com/..."
                            className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-100 focus:border-purple-200 transition-all font-bold placeholder:text-slate-300 text-xs"
                          />
                        </div>

                        {/* Local pick method */}
                        <div className="space-y-1">
                          <span className="text-[7px] font-black tracking-wider uppercase text-slate-400 pl-1">Upload File</span>
                          <label className="flex items-center justify-center w-full h-[38px] rounded-xl bg-purple-50/50 border border-dashed border-purple-200 hover:bg-purple-50 text-purple-600 cursor-pointer font-bold text-xs transition-colors">
                            {isCoverUploading ? (
                              <span className="flex items-center gap-1.5 animate-pulse">
                                <span className="w-3 h-3 rounded-full border border-purple-600 border-t-transparent animate-spin" />
                                Processing...
                              </span>
                            ) : (
                              <span>📁 Pick Cover Image</span>
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleCoverFileChange}
                              className="hidden"
                              disabled={isCoverUploading}
                            />
                          </label>
                        </div>
                      </div>

                      {/* Cover presets */}
                      <div className="flex gap-2 pt-1 flex-wrap items-center">
                        <span className="text-[7px] font-black tracking-widest uppercase text-slate-400 mr-1">Presets:</span>
                        {[
                          { label: 'Web', url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000' },
                          { label: 'System', url: 'https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=1000' },
                          { label: 'Creative', url: 'https://images.unsplash.com/photo-1544787210-2211d7c309c7?q=80&w=1000' }
                        ].map(img => (
                          <button
                            key={img.label}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, image: img.url }))}
                            className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded text-[7px] font-bold uppercase transition-colors"
                          >
                            {img.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* B. Gallery Screenshots Section (Up to 50 Images) */}
                    <div className="glass p-5 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-[9px] font-black tracking-widest uppercase text-purple-600 pl-1">
                          Project Screenshot Gallery ({formData.gallery ? formData.gallery.length : 0})
                        </label>
                        <span className="text-[8px] font-bold text-slate-400 uppercase">Limit: 50 Photos</span>
                      </div>

                      {/* Multi file pick uploader */}
                      <label className="flex flex-col items-center justify-center w-full h-24 rounded-2xl bg-white/70 border border-dashed border-slate-200 hover:border-purple-300 hover:bg-white text-slate-500 hover:text-purple-600 cursor-pointer font-bold text-xs transition-all space-y-1.5">
                        {isGalleryUploading ? (
                          <div className="flex flex-col items-center space-y-1.5 animate-pulse">
                            <span className="w-4 h-4 rounded-full border-2 border-purple-600 border-t-transparent animate-spin" />
                            <span className="text-[10px] tracking-wide">Processing & Staging Assets...</span>
                          </div>
                        ) : (
                          <>
                            <span className="text-xl">📸</span>
                            <span>Upload Local Screenshots (Multi-Select)</span>
                            <span className="text-[8px] text-slate-400 font-medium font-main">Compacts images to under 25KB each (optimized for Firestore)</span>
                          </>
                        )}
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleGalleryFilesChange}
                          className="hidden"
                          disabled={isGalleryUploading}
                        />
                      </label>

                      {/* Add Gallery URL Paste Input */}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Paste individual screenshot URL link..."
                          value={galleryUrlInput}
                          onChange={(e) => setGalleryUrlInput(e.target.value)}
                          className="flex-1 px-4 py-2 rounded-xl bg-white border border-slate-100 focus:border-purple-200 transition-all font-bold placeholder:text-slate-300 text-xs"
                        />
                        <button
                          type="button"
                          onClick={handleAddGalleryUrl}
                          className="px-4 py-2 bg-slate-900 text-white font-black tracking-widest text-[8px] uppercase rounded-xl hover:bg-purple-600 transition-colors"
                        >
                          + ADD LINK
                        </button>
                      </div>

                      {/* Gallery thumbnails grid */}
                      {formData.gallery && formData.gallery.length > 0 && (
                        <div className="grid grid-cols-4 gap-2 pt-2 max-h-56 overflow-y-auto pr-1 custom-scrollbar">
                          {formData.gallery.map((img, idx) => (
                            <div key={idx} className="relative aspect-[16/10] rounded-lg overflow-hidden border border-slate-200/50 shadow-sm group bg-slate-100">
                              <img
                                src={img}
                                alt={`Gallery thumbnail ${idx + 1}`}
                                className="w-full h-full object-cover"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveGalleryImage(idx)}
                                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded text-[8px] font-bold shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Remove screenshot"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Technologies tags list */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black tracking-widest uppercase text-slate-400 pl-2">Technologies (Comma-separated)</label>
                    <input
                      type="text"
                      name="technologiesText"
                      value={formData.technologiesText}
                      onChange={handleInputChange}
                      placeholder="e.g. React.js, Node.js, Express"
                      className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-purple-200 transition-all font-bold placeholder:text-slate-300 text-sm"
                    />
                  </div>

                  {/* Long detailed description */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black tracking-widest uppercase text-slate-400 pl-2">Description Overview</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows="4"
                      placeholder="Specify project parameters, role metrics, and achievements..."
                      className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-purple-200 transition-all font-bold placeholder:text-slate-300 text-sm resize-none"
                    />
                  </div>

                  {/* Dynamically Managed Links Array */}
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <label className="text-[10px] font-black tracking-widest uppercase text-slate-400 pl-2 block">Action Deployments ({formData.links.length})</label>
                    
                    {/* Links loop */}
                    {formData.links.length > 0 && (
                      <div className="flex flex-col gap-2 max-h-40 overflow-y-auto bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                        {formData.links.map((lnk, idx) => (
                          <div key={idx} className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-100 text-xs">
                            <span className="font-bold text-slate-800">{lnk.label}</span>
                            <span className="text-slate-400 truncate max-w-[120px] italic">{lnk.url}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveLink(idx)}
                              className="text-red-500 hover:text-red-700 font-bold p-1"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Link additions field */}
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Label (e.g. Portal)"
                        value={linkInput.label}
                        onChange={(e) => setLinkInput(prev => ({ ...prev, label: e.target.value }))}
                        className="px-4 py-2.5 rounded-lg bg-slate-50 border-transparent text-xs font-bold"
                      />
                      <input
                        type="text"
                        placeholder="URL (http://...)"
                        value={linkInput.url}
                        onChange={(e) => setLinkInput(prev => ({ ...prev, url: e.target.value }))}
                        className="px-4 py-2.5 rounded-lg bg-slate-50 border-transparent text-xs font-bold"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleAddLink}
                      className="w-full py-2 bg-slate-100 text-slate-700 border border-slate-100 hover:bg-slate-200 text-[9px] font-black tracking-widest uppercase rounded-lg transition-colors"
                    >
                      + ADD ACTION LINK
                    </button>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex gap-4 pt-6 border-t border-slate-100">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="flex-1 py-4 bg-slate-950 text-white font-black tracking-widest text-[9px] uppercase rounded-xl hover:bg-purple-600 transition-all duration-300 shadow-md disabled:opacity-50"
                    >
                      {isSaving ? 'Saving...' : 'COMMIT ENTRY'}
                    </button>
                    {(isEditing || formData.title) && (
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="px-6 py-4 bg-slate-100 text-slate-600 font-bold text-[9px] uppercase rounded-xl hover:bg-slate-200 transition-all"
                      >
                        RESET
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Active Projects Grid & Table - 7 columns */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-950 uppercase tracking-tight font-heading">
                    Active Catalog
                  </h3>
                  <p className="text-xs text-slate-400 font-medium font-main mt-1">
                    Manage and review deployment entities synced to Firestore.
                  </p>
                </div>

                {isLoading ? (
                  /* Loading placeholders loop */
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="glass p-6 rounded-[2rem] h-28 animate-pulse flex items-center space-x-6 border border-slate-50">
                        <div className="w-16 h-16 bg-slate-100 rounded-2xl" />
                        <div className="flex-1 space-y-3">
                          <div className="h-3 w-1/3 bg-slate-100 rounded" />
                          <div className="h-5 w-2/3 bg-slate-100 rounded" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : projects.length === 0 ? (
                  <div className="glass p-12 rounded-[2rem] text-center border border-slate-100">
                    <p className="text-slate-400 font-semibold font-main">No projects found. Seed or create some items.</p>
                  </div>
                ) : (
                  /* Active projects catalog */
                  <div className="space-y-4">
                    {projects.map((project) => (
                      <motion.div
                        key={project.id}
                        layoutId={`project-row-${project.id}`}
                        className="glass p-6 rounded-[2rem] hover:bg-white border border-slate-100/50 hover:shadow-xl transition-all duration-300 flex items-center gap-6"
                      >
                        {/* Thumbnail */}
                        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 shrink-0 shadow-inner">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Title details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-[8px] font-black tracking-widest text-purple-600 uppercase">
                              {project.category}
                            </span>
                            <span className="text-[8px] font-bold text-slate-400 uppercase">
                              • {project.period}
                            </span>
                          </div>
                          <h4 className="text-base font-bold text-slate-900 truncate uppercase tracking-tight font-heading">
                            {project.title}
                          </h4>
                          <div className="flex gap-1.5 flex-wrap mt-2">
                            {project.technologies.slice(0, 3).map(t => (
                              <span key={t} className="text-[7px] font-black tracking-widest uppercase px-2 py-0.5 bg-slate-50 text-slate-400 rounded">
                                {t}
                              </span>
                            ))}
                            {project.technologies.length > 3 && (
                              <span className="text-[7px] font-black tracking-widest uppercase px-2 py-0.5 bg-purple-50 text-purple-400 rounded">
                                +{project.technologies.length - 3}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Actions controls */}
                        <div className="flex gap-2 shrink-0">
                          <button
                            onClick={() => handleEditInit(project)}
                            className="p-3 bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-xl hover:scale-105 transition-all shadow-sm"
                            title="Edit entry"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(project.id)}
                            className="p-3 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl hover:scale-105 transition-all shadow-sm"
                            title="Delete entry"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
