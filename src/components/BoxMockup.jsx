import React, { useState } from 'react';
import './BoxMockup.css';

export default function BoxMockup({ project, compact = false }) {
  const [rotation, setRotation] = useState(-24);
  const [opened, setOpened] = useState(false);
  const technologies = project.technologies || [];
  const hasBackPanel = technologies.includes('Box Back Panel');
  const hasSidePanel = technologies.includes('Box Side Panel');
  const backImage = hasBackPanel ? project.gallery?.[0] : '';
  const sideImage = hasSidePanel ? project.gallery?.[hasBackPanel ? 1 : 0] : '';
  const mockupStyle = technologies.find((tech) => tech.startsWith('Mockup Style: '))?.replace('Mockup Style: ', '').toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'tuck-end-carton';
  const material = technologies.find((tech) => tech.startsWith('Material: '))?.replace('Material: ', '').toLowerCase().replace(/\s+/g, '-') || 'matte-paper';
  const stop = (event) => event.stopPropagation();
  return <div className={`box-project-mockup ${compact ? 'compact' : ''}`}>
    <div className="box-project-stage">
      <div className={`box-project-object mockup-${mockupStyle} material-${material} ${opened ? 'opened' : ''}`} style={{ transform: `rotateX(-8deg) rotateY(${rotation}deg)` }}>
        <div className="box-project-front" style={{ backgroundImage: `linear-gradient(180deg,rgba(4,8,18,.04),rgba(4,8,18,.16)),url("${project.image}")` }} />
        <div className="box-project-right" style={sideImage ? { backgroundImage: `url("${sideImage}")` } : undefined}><span>{!sideImage && project.title}</span></div>
        <div className="box-project-left" style={sideImage ? { backgroundImage: `url("${sideImage}")` } : undefined} />
        <div className="box-project-back" style={backImage ? { backgroundImage: `url("${backImage}")` } : undefined}><span>{!backImage && project.title}</span></div>
        <div className="box-project-top" />
        <div className="box-project-flap left" /><div className="box-project-flap right" /><div className="box-project-flap back" />
        {opened && <div className="box-project-inside"><b>INSIDE THE BOX</b><span>Designed with care</span></div>}
      </div>
    </div>
    <div className="box-project-controls" onPointerDown={stop} onClick={stop}>
      <label><span>TURN</span><input aria-label="Rotate box mockup" type="range" min="-120" max="120" value={rotation} onChange={(event) => setRotation(Number(event.target.value))} /></label>
      <button type="button" onClick={(event) => { stop(event); setOpened((value) => !value); }}>{opened ? 'Close' : 'Open'} <span>↗</span></button>
    </div>
  </div>;
}
