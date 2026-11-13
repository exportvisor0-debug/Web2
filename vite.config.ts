import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  // Safely expose VITE_ and standard env variables on process.env for both Node and browser environments
  const processEnv: Record<string, string> = {
    NODE_ENV: mode === 'production' ? 'production' : 'development',
  };

  for (const [key, val] of Object.entries(env)) {
    if (key.startsWith('VITE_') || key.startsWith('PUBLIC_')) {
      processEnv[key] = val;
    }
  }

  return {
    base: '/',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    define: {
      'process.env': JSON.stringify(processEnv),
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules')) {
              if (id.includes('react-dom') || id.includes('/react/')) {
                return 'vendor-react';
              }
              if (id.includes('motion') || id.includes('framer-motion')) {
                return 'vendor-motion';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
            }
            if (id.includes('/src/data/products.ts')) {
              return 'catalogue-data';
            }
          },
        },
      },
    },
  };
});

