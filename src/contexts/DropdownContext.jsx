import React, { createContext, useContext, useState } from 'react';

const DropdownContext = createContext();

export const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('useDropdown debe ser usado dentro de un DropdownProvider');
  }
  return context;
};

export const DropdownProvider = ({ children }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const openDropdownById = (id) => {
    setOpenDropdown(id);
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
  };

  const isDropdownOpen = (id) => {
    return openDropdown === id;
  };

  return (
    <DropdownContext.Provider value={{
      openDropdown,
      openDropdownById,
      closeDropdown,
      isDropdownOpen
    }}>
      {children}
    </DropdownContext.Provider>
  );
}; 