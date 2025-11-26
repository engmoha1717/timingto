import React from 'react';

interface AdPlaceholderProps {
  variant?: 'horizontal' | 'vertical';
}

const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ variant = 'horizontal' }) => {
  return (
    <div className={`
      relative overflow-hidden rounded-xl border border-white/5 bg-black/20 
      flex items-center justify-center text-xs text-white/20 uppercase tracking-widest
      transition-opacity duration-500 hover:opacity-100
      ${variant === 'horizontal' ? 'w-full h-[90px]' : 'w-[300px] h-[250px]'}
    `}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
      <span className="font-mono">Sponsored Advertisement</span>
    </div>
  );
};

export default AdPlaceholder;