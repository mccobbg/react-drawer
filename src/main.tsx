import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { StateContextProvider } from './context/user-context';
import { ThemeProvider } from './context/theme-context';
import { ModalProvider } from './context/modal-context';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <ModalProvider>
        <CookiesProvider>
          <StateContextProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </StateContextProvider>
        </CookiesProvider>
      </ModalProvider>
    </ThemeProvider>
  </React.StrictMode>,
);

