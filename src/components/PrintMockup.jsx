import React, { useState } from 'react';
import './PrintMockup.css';

export default function PrintMockup({ project, compact = false }) {
  const [rotation, setRotation] = useState(0);
  const [isA3Open, setIsA3Open] = useState(false);
  const backImage = project.technologies?.includes('Print Back Side') ? project.gallery?.[0] : '';
  const isHandbill = project.technologies?.includes('Handbill');
  const isA3CoverSpread = project.technologies?.includes('A3 Cover Spread');
  const mockupStyle = project.technologies?.find((tech) => tech.startsWith('Mockup Style: '))?.replace('Mockup Style: ', '').toLowerCase().replace(/[^a-z0-9]+/g, '-') || '';
  const material = project.technologies?.find((tech) => tech.startsWith('Material: '))?.replace('Material: ', '').toLowerCase().replace(/\s+/g, '-') || 'matte-paper';
  const stop = (event) => event.stopPropagation();
  return <div className={`print-project-mockup ${compact ? 'compact' : ''}`}>
    <div className="print-project-stage">
      {isA3CoverSpread ? <div className={`print-project-sheet a3-cover-spread ${isA3Open ? 'opened' : ''}`} style={{ transform: `perspective(1000px) rotateY(${rotation}deg) rotateX(3deg)` }} aria-label={isA3Open ? 'Open A3 book: left half is the back cover and right half is the front cover' : 'Closed A3 book showing the front cover'}>
        <div className="a3-spread-page a3-spread-back"><img src={project.image} alt="Back cover, left half of the A3 artwork" /></div>
        <div className="a3-spread-page a3-spread-front"><img src={project.image} alt="Front cover, right half of the A3 artwork" /></div>
        <div className="a3-spread-fold" />
      </div> : <div className={`print-project-sheet ${isHandbill ? 'handbill' : 'a3'} ${mockupStyle ? `mockup-${mockupStyle}` : ''} material-${material}`} style={{ transform: `perspective(1000px) rotateY(${rotation}deg) rotateX(3deg)` }}>
        <div className="print-project-face front"><img src={project.image} alt="Front of print design" /></div>
        <div className="print-project-face back">{backImage ? <img src={backImage} alt="Back of print design" /> : <div className="print-project-back-text"><span>BACK SIDE</span><b>{project.title}</b><p>{project.description}</p></div>}</div>
      </div>}
    </div>
    <div className="print-project-controls" onPointerDown={stop} onClick={stop}>
      <label><span>TURN</span><input type="range" min="-180" max="180" value={rotation} aria-label="Rotate print design" onChange={(event) => setRotation(Number(event.target.value))} /></label>
      <span className="print-side-label">{isA3CoverSpread ? isA3Open ? 'BACK LEFT · FRONT RIGHT' : 'FRONT COVER' : Math.abs(rotation) > 90 ? 'BACK' : 'FRONT'}</span>
      {isA3CoverSpread && <button type="button" className="a3-project-open-button" aria-expanded={isA3Open} onClick={() => setIsA3Open((open) => !open)}>{isA3Open ? 'CLOSE BOOK' : 'OPEN BOOK'}</button>}
    </div>
  </div>;
}
