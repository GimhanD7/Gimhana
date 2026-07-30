import React from 'react';

const Background = () => (
  <div
    className="fixed inset-0 -z-10 bg-[#fafafa] pointer-events-none"
    aria-hidden="true"
  >
    <div
      className="absolute inset-0 opacity-70"
      style={{
        backgroundImage: `
          radial-gradient(circle at 8% 5%, rgba(124, 58, 237, 0.10), transparent 34%),
          radial-gradient(circle at 92% 12%, rgba(79, 70, 229, 0.07), transparent 32%),
          radial-gradient(circle at 85% 92%, rgba(124, 58, 237, 0.08), transparent 35%),
          radial-gradient(circle at 1px 1px, rgba(15, 23, 42, 0.035) 1px, transparent 0)
        `,
        backgroundSize: 'auto, auto, auto, 48px 48px',
      }}
    />
  </div>
);

export default Background;
