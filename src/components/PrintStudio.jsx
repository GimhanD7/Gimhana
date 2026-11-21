import React, { useEffect, useMemo, useState } from 'react';
import './PrintStudio.css';
import { projectService } from '../utils/projectService';

const PRESETS = {
  a3: { label: 'A3 Tuition Cover', ratio: 'A3 cover spread · 420 × 297 mm' },
  magazine: { label: 'Magazine', ratio: 'A4 portrait · 210 × 297 mm' },
  handbill: { label: 'Handbill', ratio: 'A5 portrait · 148 × 210 mm' },
  box: { label: 'Product Box', ratio: 'Custom packaging · 3D preview' },
};
const MOCKUP_STYLES = {
  a3: ['A3 portrait sheet', 'Landscape poster', 'Framed print'],
  magazine: ['A4 editorial', 'Square magazine', 'Pocket booklet'],
  handbill: ['A5 handbill', 'A4 flyer', 'DL leaflet'],
  box: ['Tuck-end carton', 'Cube gift box', 'Tall product box'],
};
const MOCKUP_SCENES = { Studio: '#20212a', Light: '#d5d4d2', Warm: '#c9b9a0' };
const STORAGE_KEY = 'gimhana-print-studio-designs-v1';

const readSaved = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
};

function Artwork({ design, className = '' }) {
  return <div className={`print-artwork ${className}`}>
    {design.image ? <img src={design.image} alt="Uploaded design artwork" className="print-art-image" /> : <span className="print-art-empty">Upload artwork to preview</span>}
  </div>;
}

export default function PrintStudio() {
  const [preset, setPreset] = useState('a3');
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [image, setImage] = useState('');
  const [mockupStyle, setMockupStyle] = useState(MOCKUP_STYLES.a3[0]);
  const [material, setMaterial] = useState('Matte paper');
  const [scene, setScene] = useState('Studio');
  const [rotation, setRotation] = useState(0);
  const [isA3Open, setIsA3Open] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [saved, setSaved] = useState(readSaved);
  const [message, setMessage] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [publishedProjects, setPublishedProjects] = useState([]);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [isMinimized, setIsMinimized] = useState(() => {
    try {
      return localStorage.getItem('gimhana-print-studio-minimized') === 'true';
    } catch {
      return false;
    }
  });
  const [paperScaleMode, setPaperScaleMode] = useState('normal'); // 'normal' | 'minimized'

  const toggleMinimized = () => {
    setIsMinimized((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('gimhana-print-studio-minimized', String(next));
      } catch {}
      return next;
    });
  };

  const design = useMemo(() => ({ preset, image, mockupStyle, material }), [preset, image, mockupStyle, material]);
  const mockupStyleClass = mockupStyle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const materialClass = material.toLowerCase().replace(/\s+/g, '-');

  const loadPublishedProjects = async () => {
    try {
      const projects = await projectService.getProjects();
      setPublishedProjects(projects.filter((project) => ['Magazine Design', 'Print Design'].includes(project.category)));
    } catch { setMessage('Unable to load published print designs.'); }
  };

  useEffect(() => { loadPublishedProjects(); }, []);

  const selectPreset = (key) => {
    setPreset(key);
    setProjectTitle(''); setProjectDescription(''); setImage(''); setMockupStyle(MOCKUP_STYLES[key][0]); setRotation(0); setIsA3Open(false); setIsOpen(false);
  };

  /* Saved designs can restore their own custom copy after switching preset. */
  const applySavedDesign = (item) => {
    setPreset(item.preset); setProjectTitle(item.projectTitle || ''); setProjectDescription(item.projectDescription || ''); setImage(item.image || ''); setMockupStyle(item.mockupStyle || MOCKUP_STYLES[item.preset][0]); setMaterial(item.material || 'Matte paper'); setIsA3Open(false); setMessage('Saved design loaded.');
  };

  const editPublishedDesign = (project) => {
    const typeName = project.technologies?.[0];
    const presetKey = Object.keys(PRESETS).find((key) => PRESETS[key].label === typeName) || 'magazine';
    setEditingProjectId(project.id);
    setPreset(presetKey); setProjectTitle(project.title); setProjectDescription(project.description);
    setImage(project.image || '');
    setIsA3Open(false);
    setMockupStyle(project.technologies?.find((tech) => tech.startsWith('Mockup Style: '))?.replace('Mockup Style: ', '') || MOCKUP_STYLES[presetKey][0]);
    setMaterial(project.technologies?.find((tech) => tech.startsWith('Material: '))?.replace('Material: ', '') || 'Matte paper');
    setMessage('Editing published design. Changes will update the Projects page.');
    document.getElementById('print-studio-title')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleImage = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { setMessage('Choose an image file.'); return; }
    if (file.size > 10 * 1024 * 1024) { setMessage('Image must be under 10 MB.'); return; }
    setIsUploading(true);
    setMessage('Uploading artwork…');
    try {
      const uploadedUrl = await projectService.uploadImage(file, file.name);
      setImage(uploadedUrl);
      setMessage('Artwork uploaded and fitted to the selected mockup.');
    } catch (error) {
      setMessage(error.message || 'Artwork upload failed.');
    } finally {
      setIsUploading(false);
      event.target.value = '';
    }
    event.target.value = '';
  };

  const saveDesign = () => {
    const entry = { ...design, projectTitle, projectDescription, id: Date.now(), savedAt: new Date().toISOString() };
    const next = [entry, ...saved].slice(0, 20);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); setSaved(next); setMessage('Design saved in this browser.'); }
    catch { setMessage('Storage is full. Remove an older design or use a smaller image.'); }
  };

  const publishToProjects = async () => {
    if (!projectTitle.trim() || !projectDescription.trim()) { setMessage('Add a project title and description before publishing.'); return; }
    setIsPublishing(true);
    setMessage('Publishing project…');
    try {
      let coverImage = image;
      if (!coverImage) {
        const safeTitle = projectTitle.trim().replace(/[&<>]/g, '');
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 980"><rect width="700" height="980" fill="#ece9e2"/><text x="70" y="520" fill="#24283a" font-family="Arial,sans-serif" font-size="52" font-weight="700">${safeTitle}</text></svg>`;
        const svgUrl = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
        try {
          const coverBlob = await new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            canvas.width = 700; canvas.height = 980;
            const context = canvas.getContext('2d');
            const imageElement = new Image();
            imageElement.onload = () => { context.drawImage(imageElement, 0, 0); canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('Unable to create cover artwork.')), 'image/jpeg', 0.9); };
            imageElement.onerror = reject;
            imageElement.src = svgUrl;
          });
          coverImage = await projectService.uploadImage(coverBlob, 'print-design-cover.jpg');
        } finally { URL.revokeObjectURL(svgUrl); }
      }
      await projectService.saveProject({
        ...(editingProjectId ? { id: editingProjectId } : {}),
        title: projectTitle.trim(),
        period: String(new Date().getFullYear()),
        description: projectDescription.trim(),
        category: preset === 'magazine' ? 'Magazine Design' : 'Print Design',
        image: coverImage,
        gallery: [],
        technologies: [PRESETS[preset].label, `Mockup Style: ${mockupStyle}`, `Material: ${material}`, ...(preset === 'magazine' ? ['Magazine Mockup'] : ['Print Mockup', ...(preset === 'a3' ? ['A3 Cover Spread'] : [])])],
        links: [],
      });
      setMessage(editingProjectId ? 'Project design updated.' : 'Published to the Projects page.');
      setEditingProjectId(null);
      await loadPublishedProjects();
    } catch (error) {
      setMessage(error.message || 'Unable to publish this design.');
    } finally {
      setIsPublishing(false);
    }
  };

  const removeSaved = (id) => {
    const next = saved.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); setSaved(next);
  };

  if (isMinimized) {
    return (
      <section className="print-studio print-studio-minimized" aria-labelledby="print-studio-title">
        <div className="print-studio-heading" style={{ margin: 0, alignItems: 'center' }}>
          <div>
            <span className="print-studio-eyebrow">PRINT &amp; PACKAGING WORKSPACE</span>
            <h2 id="print-studio-title" style={{ fontSize: '24px', margin: '4px 0 2px' }}>
              Print <em>Studio.</em>
            </h2>
            <p style={{ fontSize: '12px', margin: 0 }}>Workspace is minimized. Click &ldquo;Normal Mode&rdquo; to expand.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="print-studio-count">{saved.length} SAVED</span>
            <button
              type="button"
              className="print-studio-toggle-btn"
              onClick={toggleMinimized}
            >
              + Normal Mode
            </button>
          </div>
        </div>
      </section>
    );
  }

  return <section className="print-studio" aria-labelledby="print-studio-title">
    <div className="print-studio-heading">
      <div>
        <span className="print-studio-eyebrow">PRINT & PACKAGING WORKSPACE</span>
        <h2 id="print-studio-title">Print <em>Studio.</em></h2>
        <p>Create artwork and preview it on realistic print and packaging mockups.</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span className="print-studio-count">{saved.length} SAVED</span>
        <button
          type="button"
          className="print-studio-toggle-btn"
          onClick={toggleMinimized}
          title="Minimize Print Studio"
        >
          – Minimize
        </button>
      </div>
    </div>
    <div className="print-studio-tabs" role="tablist" aria-label="Design type">
      {Object.entries(PRESETS).map(([key, value]) => <button key={key} type="button" role="tab" aria-selected={preset === key} disabled={Boolean(editingProjectId)} className={`${preset === key ? 'active' : ''} ${editingProjectId ? 'disabled' : ''}`} onClick={() => selectPreset(key)}>{value.label}</button>)}
    </div>
    <div className="mockup-library" aria-label="Choose a mockup template">
      <div className="mockup-library-heading"><b>Choose a mockup</b><span>SELECT A STARTING SHAPE</span></div>
      <div className="mockup-template-grid">{MOCKUP_STYLES[preset].map((style, index) => <button type="button" key={style} aria-pressed={mockupStyle === style} onClick={() => setMockupStyle(style)} className={`mockup-template ${mockupStyle === style ? 'active' : ''}`}><span className={`template-icon template-icon-${preset} template-variant-${index}`}><i /></span><span>{style}</span><small>{preset === 'box' ? ['Folding carton', 'Gift packaging', 'Tall carton'][index] : preset === 'magazine' ? ['Editorial', 'Square-bound', 'Compact'][index] : preset === 'handbill' ? ['Portrait print', 'Large format', 'Slim leaflet'][index] : ['Standard size', 'Wide layout', 'Display finish'][index]}</small></button>)}</div>
    </div>
    <div className="print-studio-workspace">
      <div className="print-controls">
        <div className="print-panel-title"><span>01</span><div><b>Artwork</b><small>{PRESETS[preset].ratio}</small></div></div>
        <div className="print-publish-fields"><span>PROJECT PAGE DETAILS</span><label>Project title<input value={projectTitle} maxLength={180} placeholder="e.g. Study Magazine Design" onChange={(e) => setProjectTitle(e.target.value)} /></label><label>Description<textarea value={projectDescription} rows="3" maxLength={1500} placeholder="Describe the concept, design, and print details…" onChange={(e) => setProjectDescription(e.target.value)} /></label></div>
        <label className="print-material-select">Material finish<select value={material} onChange={(event) => setMaterial(event.target.value)}><option>Matte paper</option><option>Glossy print</option><option>Kraft board</option></select></label>
        <label className="print-upload">Artwork image <input type="file" accept="image/*" onChange={handleImage} /><span>{image ? 'Replace image' : 'Choose image'} <b>＋</b></span></label>
        {image && <button className="print-remove-image" type="button" onClick={() => setImage('')}>Remove image</button>}
        <div className="print-tip">Your artwork is applied to the mockup automatically as you edit.</div>
        <button type="button" className="print-save-button" onClick={saveDesign}>Save design <span>↗</span></button>
        <button type="button" className="print-publish-button" onClick={publishToProjects} disabled={isPublishing || isUploading}>{isPublishing ? 'Saving…' : editingProjectId ? 'Save project changes' : 'Publish to Projects'} <span>↗</span></button>
        {editingProjectId && <button type="button" className="print-remove-image" onClick={() => { setEditingProjectId(null); setMessage('Project edit cancelled.'); }}>Cancel project edit</button>}
        {message && <p className="print-message" role="status">{message}</p>}
      </div>
        <div className="print-preview-panel">
        <div className="print-preview-toolbar">
          <div><span>02</span><b>Live mockup</b></div>
          <div className="print-preview-scale-toggle" title="Toggle Paper Preview Mode">
            <button
              type="button"
              className={paperScaleMode === 'normal' ? 'active' : ''}
              onClick={() => setPaperScaleMode('normal')}
            >
              Normal mode
            </button>
            <button
              type="button"
              className={paperScaleMode === 'minimized' ? 'active' : ''}
              onClick={() => setPaperScaleMode('minimized')}
            >
              Minimize paper
            </button>
          </div>
          <label className="print-scene-select">Scene<select value={scene} onChange={(event) => setScene(event.target.value)}>{Object.keys(MOCKUP_SCENES).map((name) => <option key={name}>{name}</option>)}</select></label>
          <span className="print-live"><i /> LIVE</span>
        </div>
        <div className={`print-mockup-stage ${preset === 'box' ? 'box-stage' : ''} ${paperScaleMode === 'minimized' ? 'paper-minimized' : ''}`} style={{ background: MOCKUP_SCENES[scene] }}>
          {preset === 'a3' ? <div className={`a3-cover-mockup ${isA3Open ? 'opened' : ''} mockup-${mockupStyleClass}`} style={{ transform: `perspective(1000px) rotateY(${rotation}deg) rotateX(3deg)` }} aria-label={isA3Open ? 'Open A3 book: left half is the back cover and right half is the front cover' : 'Closed A3 book showing the front cover'}>
            <div className="a3-cover-panel a3-back-cover">{image ? <img src={image} alt="Back cover artwork, left half of the A3 design" /> : <span>BACK COVER · LEFT</span>}</div>
            <div className="a3-cover-panel a3-front-cover">{image ? <img src={image} alt="Front cover artwork, right half of the A3 design" /> : <span>FRONT COVER · RIGHT</span>}</div>
            <div className="a3-cover-fold" />
            <div className="a3-cover-spine" />
          </div> : preset === 'box' ? <div className={`box-mockup mockup-${mockupStyleClass} material-${materialClass} ${isOpen ? 'opened' : ''}`} style={{ transform: `rotateY(${rotation}deg)` }}>
            <div className="box-main"><div className="box-front"><Artwork design={design} /></div><div className="box-side" /><div className="box-back-panel" /><div className="box-top" /></div>
            <div className="box-flap box-flap-left" /><div className="box-flap box-flap-right" /><div className="box-flap box-flap-back" />
            {isOpen && <div className="box-interior"><span>INSIDE THE BOX</span><Artwork design={design} className="box-inner-art" /></div>}
          </div> : <div className={`print-object print-object-${preset} mockup-${mockupStyleClass} material-${materialClass}`} style={{ transform: `perspective(1000px) rotateY(${rotation + (preset === 'magazine' ? -12 : 0)}deg) rotateX(2deg)` }}>
            {preset === 'magazine' && <><div className="magazine-pages" /><div className="magazine-spine" /></>}
            <Artwork design={design} className="print-object-face" />
          </div>}
        </div>
        <div className="print-preview-controls"><label><span>ROTATE</span><input type="range" min="-180" max="180" value={rotation} onChange={(e) => setRotation(Number(e.target.value))} /><b>{rotation}°</b></label>{preset === 'box' && <button type="button" className="box-toggle" onClick={() => setIsOpen((open) => !open)}>{isOpen ? 'Close box' : 'Open box'} <span>{isOpen ? '↙' : '↗'}</span></button>}{preset === 'a3' && <button type="button" className="box-toggle" aria-expanded={isA3Open} onClick={() => setIsA3Open((open) => !open)}>{isA3Open ? 'Close book' : 'Open book'} <span>{isA3Open ? '↙' : '↗'}</span></button>}</div>
        <p className="print-preview-note">Drag the slider to view the mockup from different angles. {preset === 'box' ? 'Open the box to see its inside.' : preset === 'a3' ? 'Open the book to see the back cover on the left and the front cover on the right.' : 'Artwork is placed on the front only.'}</p>
      </div>
    </div>
    <div className="print-saved-section"><div className="print-saved-heading"><div><span>PUBLISHED TO THE PROJECTS PAGE</span><h3>Manage print designs</h3></div><small>Changes publish immediately</small></div>
      {publishedProjects.length ? <div className="print-saved-grid">{publishedProjects.map((project) => <article className="print-saved-card" key={project.id}><div className="print-saved-thumb">{project.image && <img src={project.image} alt="" />}<b>{project.title}</b></div><div className="print-saved-meta"><span>{project.technologies?.[0] || project.category}</span><button type="button" onClick={() => editPublishedDesign(project)}>Edit design</button></div></article>)}</div> : <p className="print-empty">Published print and packaging projects will appear here for editing.</p>}
    </div>
    <div className="print-saved-section"><div className="print-saved-heading"><div><span>YOUR LIBRARY</span><h3>Saved designs</h3></div><small>Stored in this browser</small></div>
      {saved.length ? <div className="print-saved-grid">{saved.map((item) => <article className="print-saved-card" key={item.id}><div className="print-saved-thumb">{item.image && <img src={item.image} alt="" />}<b>{item.projectTitle || PRESETS[item.preset]?.label}</b></div><div className="print-saved-meta"><span>{PRESETS[item.preset]?.label || item.preset}</span><button type="button" onClick={() => applySavedDesign(item)}>Open</button><button type="button" aria-label={`Delete ${item.projectTitle || item.preset}`} onClick={() => removeSaved(item.id)}>×</button></div></article>)}</div> : <p className="print-empty">Saved artwork will appear here. Create a design above and choose “Save design”.</p>}
    </div>
  </section>;
}
