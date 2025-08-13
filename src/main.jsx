import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import './index.css';
import App from './App.jsx';
import { DropdownProvider } from './contexts/DropdownContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <DropdownProvider>
        <App />
      </DropdownProvider>
    </BrowserRouter>
  </StrictMode>
);
