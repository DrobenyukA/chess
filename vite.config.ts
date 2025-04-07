import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      /**
       * Make sure to have same config in tsconfig.app.json
       */
      '@app': path.resolve(__dirname, 'src'),
    },
  },
});
