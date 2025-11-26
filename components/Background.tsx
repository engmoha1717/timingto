import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0a0a0a]">
      {/* Mesh Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-indigo-900/30 blur-[120px] mix-blend-screen animate-pulse duration-[10000ms]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-purple-900/20 blur-[100px] mix-blend-screen animate-pulse duration-[7000ms]" />
      <div className="absolute top-[40%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-blue-900/20 blur-[90px] mix-blend-screen" />
      
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>
    </div>
  );
};

export default Background;