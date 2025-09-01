import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useDropdown } from '../../contexts/DropdownContext';

const SelectInput = ({ 
  options, 
  value, 
  onChange, 
  placeholder = 'Select an option',
  id // ID único para identificar este dropdown
}) => {
  const theme = useTheme();
  const { openDropdownById, closeDropdown, isDropdownOpen } = useDropdown();
  
  const isOpen = isDropdownOpen(id);

  const selectedOption = options.find(option => option.value === value);

  const handleToggle = () => {
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdownById(id);
    }
  };

  const handleOptionClick = (optionValue) => {
    onChange(optionValue);
    closeDropdown();
  };

  // Cerrar dropdown cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(`[data-dropdown-id="${id}"]`)) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, id, closeDropdown]);

  return (
    <div className="relative" data-dropdown-id={id}>
      <div
        className="w-full px-4 py-2 rounded-md border flex justify-between items-center cursor-pointer"
        style={{
          backgroundColor: 'rgba(15, 2, 37, 1)',
          borderColor: 'rgba(255, 110, 199, 0.3)',
          color: theme.colors.text.light,
        }}
        onClick={handleToggle}
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
              onClick={() => handleOptionClick(option.value)}
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
