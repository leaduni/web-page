import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

const defaultTheme = {
  colors: {
    primary: '#ff6ec7',
    secondary: '#7873f5',
    accent: '#ff4dcd',
    background: {
      dark: '#0f0225',
      light: '#3d0a40',
    },
    text: {
      light: '#ffffff',
      dark: '#0f0225',
    },
    form: {
      background: 'rgba(15, 2, 37, 1)',
      border: '#ff6ec7',
    },
  },
};

const ThemeContext = createContext(defaultTheme);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  return <ThemeContext.Provider value={defaultTheme}>{children}</ThemeContext.Provider>;
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
