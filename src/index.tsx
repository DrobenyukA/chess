import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'normalize.css/normalize.css';

import './index.css';
import { App } from './components/App';

const container = document.getElementById('root');

if (container) {
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} else {
  throw new Error('Could not find root element');
}
