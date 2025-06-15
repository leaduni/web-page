import React from 'react';
import { Check } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Checkbox = ({ checked, onChange, label }) => {
  const theme = useTheme();

  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <div
        className="w-5 h-5 rounded flex items-center justify-center transition-colors duration-200"
        style={{
          backgroundColor: checked ? theme.colors.primary : 'transparent',
          border: `1px solid ${checked ? theme.colors.primary : 'rgba(255, 255, 255, 0.3)'}`,
        }}
        onClick={() => onChange(!checked)}
      >
        {checked && <Check size={14} color="white" />}
      </div>
      <div className="text-sm text-white">{label}</div>
    </label>
  );
};

export default Checkbox;
