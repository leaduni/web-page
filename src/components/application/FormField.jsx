import React, { ReactNode } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const FormField = ({ label, children }) => {
  const theme = useTheme();

  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-medium" style={{ color: theme.colors.primary }}>
        {label}
      </label>
      {children}
    </div>
  );
};

export default FormField;
