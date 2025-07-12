import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import routes from './routes';

export default defineConfig({
  antd: {},
  layout: {
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  model: {},
  routes,
  request: {},
  npmClient: 'pnpm',
  tailwindcss: {},
  initialState: {},
  plugins: [],
});
