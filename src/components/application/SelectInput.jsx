import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const SelectInput = ({ options, value, onChange, placeholder = 'Select an option' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className="relative">
      <div
        className="w-full px-4 py-2 rounded-md border flex justify-between items-center cursor-pointer"
        style={{
          backgroundColor: 'rgba(15, 2, 37, 1)',
          borderColor: 'rgba(255, 110, 199, 0.3)',
          color: theme.colors.text.light,
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDown
          size={18}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>

      {isOpen && (
        <div
          className="absolute z-10 w-full mt-1 rounded-md max-h-56 overflow-y-auto"
          style={{
            backgroundColor: theme.colors.form.background,
            border: `1px solid rgba(255, 110, 199, 0.3)`,
          }}
        >
          {options.map(option => (
            <div
              key={option.value}
              className="px-4 py-2 cursor-pointer hover:bg-black/20 transition-colors duration-150"
              style={{ color: '#fff' }}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectInput;
