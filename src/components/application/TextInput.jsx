import React, { ChangeEvent } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const TextInput = ({ value, onChange, placeholder = 'Value', type = 'text' }) => {
  const theme = useTheme();

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-2 rounded-md border transition-all duration-200 focus:outline-none focus:ring-2"
      style={{
        backgroundColor: 'rgba(15, 2, 37, 0.3)',
        borderColor: 'rgba(255, 110, 199, 0.3)',
        color: theme.colors.text.light,
        caretColor: theme.colors.primary,
      }}
    />
  );
};

export default TextInput;
