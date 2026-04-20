import React from 'react';

interface TagBadgeProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'glass';
  className?: string;
}

const TagBadge: React.FC<TagBadgeProps> = ({ label, variant = 'outline', className = '' }) => {
  const baseStyles = 'px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all';
  
  const variants = {
    primary: 'bg-primary text-white shadow-sm',
    secondary: 'bg-secondary-container text-on-secondary-container',
    outline: 'border border-outline-variant/30 text-on-surface-variant',
    glass: 'bg-white/10 backdrop-blur-md border border-white/20 text-white',
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {label}
    </span>
  );
};

export default TagBadge;
