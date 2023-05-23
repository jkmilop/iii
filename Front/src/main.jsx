import React from 'react';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './components/App';
import './css/main.css'; 

const rootElement = document.getElementById('root');

const renderApp = () => {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
};

try {
  renderApp();
} catch (error) {
  console.error('Se produjo un error al renderizar la aplicación:', error);
}

if (process.env.NODE_ENV === 'production') {
  // Habilita aquí las optimizaciones de producción, como minificación y compresión
}

// Si decides utilizar la división de código, carga diferida o importaciones dinámicas,
// puedes implementar esas características aquí utilizando herramientas como Webpack o Parcel
