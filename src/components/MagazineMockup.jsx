import React, { useState } from 'react';
import './MagazineMockup.css';

export default function MagazineMockup({ project, compact = false }) {
  const [spread, setSpread] = useState(0);
  const description = project.description || 'A considered editorial design, created to make every page worth turning.';
  const image = project.image || '';
  const backImage = project.technologies?.includes('Magazine Back Cover') ? project.gallery?.[0] : '';
  const mockupStyle = project.technologies?.find((tech) => tech.startsWith('Mockup Style: '))?.replace('Mockup Style: ', '').toLowerCase().replace(/[^a-z0-9]+/g, '-') || '';
  const material = project.technologies?.find((tech) => tech.startsWith('Material: '))?.replace('Material: ', '').toLowerCase().replace(/\s+/g, '-') || 'matte-paper';
  const pages = [
    { left: 'THE BIG IDEA', right: 'A CLOSER LOOK' },
    { left: 'FROM THE STUDIO', right: 'NOTES & DETAILS' },
    { left: 'INSIDE THIS ISSUE', right: 'THE PRINT EDITION' },
  ];
  const changeSpread = (step) => setSpread((current) => Math.max(0, Math.min(pages.length + 1, current + step)));
  const startX = (event) => { event.currentTarget.dataset.dragStart = String(event.clientX); };
  const endX = (event) => {
    const start = Number(event.currentTarget.dataset.dragStart);
    if (!Number.isFinite(start)) return;
    const delta = event.clientX - start;
    if (Math.abs(delta) > 35) changeSpread(delta < 0 ? 1 : -1);
    delete event.currentTarget.dataset.dragStart;
  };

  return <div className={`magazine-mockup ${compact ? 'compact' : ''} ${mockupStyle ? `mockup-${mockupStyle}` : ''} material-${material}`} onPointerDown={startX} onPointerUp={endX}>
    {spread === 0 || spread === pages.length + 1 ? <div className={`magazine-cover-view ${spread > 0 ? 'back-cover-view' : ''}`} key={spread === 0 ? 'cover' : 'back-cover'}>
      <div className={`magazine-cover-object ${mockupStyle ? `mockup-${mockupStyle}` : ''} material-${material}`}>
        {(spread === 0 ? image : backImage) ? <img src={spread === 0 ? image : backImage} alt={`${project.title} ${spread === 0 ? 'front' : 'back'} cover`} className="magazine-cover-image" /> : <div className="magazine-cover-placeholder"><span>{spread === 0 ? (project.category || 'THE PRINT EDITION') : 'BACK COVER'}</span><b>{spread === 0 ? project.title : 'THE STORY CONTINUES'}</b><i>{spread === 0 ? project.period : 'DESIGNED WITH CARE'}</i></div>}
        <span className="magazine-cover-spine" />
      </div>
    </div> : <div className={`magazine-spread spread-${spread}`} key={spread}>
      <div className="magazine-page magazine-left">
        <div className="magazine-page-image" style={{ backgroundImage: image ? `url("${image}")` : undefined }} />
        <span className="magazine-page-kicker">{pages[spread - 1].left} <i>· 0{spread * 2}</i></span>
        <h3>{spread === 1 ? 'Ideas with a point of view.' : spread === 2 ? 'Made for curious minds.' : project.title}</h3>
        <p>{spread === 3 ? project.period : description}</p>
        <span className="magazine-page-footer">{project.category || 'EDITORIAL'} <b>G.</b></span>
      </div>
      <div className="magazine-gutter" />
      <div className="magazine-page magazine-right">
        <span className="magazine-page-kicker">{pages[spread - 1].right} <i>· 0{spread * 2 + 1}</i></span>
        <div className="magazine-right-copy"><span>FEATURED PROJECT</span><h3>{spread === 1 ? 'Designed to be explored.' : spread === 2 ? 'A story in every detail.' : project.title}</h3><p>{description}</p></div>
        <span className="magazine-page-footer">THE PRINT EDITION <b>→</b></span>
      </div>
      <div className="magazine-turn-leaf" aria-hidden="true"><span>{project.title}</span></div>
    </div>}
    {!compact && <div className="magazine-controls"><button type="button" aria-label="Previous magazine spread" onClick={(event) => { event.stopPropagation(); changeSpread(-1); }} disabled={spread === 0}>← <span>PREVIOUS</span></button><span>{spread === 0 ? 'FRONT COVER' : spread === pages.length + 1 ? 'BACK COVER' : `0${spread} / 03`}</span><button type="button" aria-label="Next magazine spread" onClick={(event) => { event.stopPropagation(); changeSpread(1); }} disabled={spread === pages.length + 1}><span>{spread === 0 ? 'OPEN MAGAZINE' : 'NEXT'}</span> →</button></div>}
    {compact && <div className="magazine-compact-control"><button type="button" aria-label="Previous magazine spread" onClick={(event) => { event.stopPropagation(); changeSpread(-1); }} disabled={spread === 0}>←</button><span>{spread === 0 ? 'FRONT COVER' : spread === pages.length + 1 ? 'BACK COVER' : `FLIP THROUGH · 0${spread}/03`}</span><button type="button" aria-label={spread === 0 ? 'Open magazine' : 'Next magazine spread'} onClick={(event) => { event.stopPropagation(); changeSpread(1); }} disabled={spread === pages.length + 1}>→</button></div>}
  </div>;
}
