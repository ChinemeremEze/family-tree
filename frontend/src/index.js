import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { AuthProvider } from './contexts/AuthContext';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

// Initial render
root.render( 
  <AuthProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthProvider>
);