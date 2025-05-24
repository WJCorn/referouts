import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const authDisabled = import.meta.env.VITE_AUTH_DISABLED === 'true';

if (authDisabled) {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  import('@clerk/clerk-react').then(({ ClerkProvider }) => {
    const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <App />
        </ClerkProvider>
      </React.StrictMode>
    );
  });
}