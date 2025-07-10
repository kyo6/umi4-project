import { defineConfig } from 'umi';
import routes from './routes';
import defaultSettings from './defaultSettings';

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
  plugins: [
    '@umijs/plugins/dist/tailwindcss',
    '@umijs/plugins/dist/request',
    '@umijs/plugins/dist/antd',
    '@umijs/plugins/dist/layout',
    '@umijs/plugins/dist/initial-state',
    '@umijs/plugins/dist/model',
  ],
});
