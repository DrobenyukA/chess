import 'normalize.css/normalize.css';
import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { App } from './components/App';
import { store } from './store';

const container = document.getElementById('root');

if (container) {
  createRoot(container).render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>,
  );
} else {
  throw new Error('Could not find root element');
}
