import React, { ReactNode } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface FormCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

const FormCard: React.FC<FormCardProps> = ({ title, subtitle, children }) => {
  const theme = useTheme();
  
  return (
    <div 
      className="rounded-xl p-6 w-full max-w-lg mx-auto mb-6"
      style={{ 
        backgroundColor: theme.colors.form.background,
        borderLeft: `3px solid ${theme.colors.form.border}`,
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