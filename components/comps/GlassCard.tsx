import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`glass-panel rounded-2xl transition-all duration-300 hover:border-white/20 hover:shadow-[0_8px_32px_rgba(168,85,247,0.1)] ${className}`}
    >
      {children}
    </div>
  );
};

export default GlassCard;