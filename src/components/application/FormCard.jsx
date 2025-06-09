import React, { ReactNode } from 'react';
import { useTheme } from '../contexts/ThemeContext';


const FormCard = ({ title, subtitle, children }) => {
  const theme = useTheme();
  
  return (
    <div 
      className="rounded-xl p-6 w-full max-w-lg mx-auto mb-6 shadow-2xl"
      style={{ 
        backgroundColor: theme.colors.form.background,
        borderLeft: `3px solid ${theme.colors.form.border}`,
        boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25), 0 1.5px 4px 0 rgba(255,110,199,0.10)'
      }}
    >
      <h2 className="text-xl font-semibold mb-1" style={{ color: theme.colors.primary }}>
        {title}
      </h2>
      
      {subtitle && (
        <p className="text-sm text-gray-400 mb-4">{subtitle}</p>
      )}
      
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

export default FormCard;