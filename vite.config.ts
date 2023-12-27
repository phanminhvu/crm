import * as path from 'path';
import { defineConfig, loadEnv, PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { viteMockServe } from 'vite-plugin-mock';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig(({ command, mode }) => {
  const root = process.cwd();

  const env = loadEnv(mode, root);
  const { VITE_APP_PORT, VITE_APP_MOCK } = env;
  const isBuild = command === 'build';
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    react(),
    // vite-plugin-svg-icons
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(__dirname, './src/assets/iconsvg')],
      // Specify symbolId format
      symbolId: 'icon-[name]',
    }), basicSsl()
  ];
  // vite-plugin-mock
  if (VITE_APP_MOCK === 'true') {
    vitePlugins.push(
      viteMockServe({
        mockPath: 'mock',
        supportTs: true,
        watchFiles: true,
        localEnabled: !isBuild,
        prodEnabled: isBuild,
        logger: true,
      }),
    );
  }

  return {
    root,
    build: {
      target: 'esnext'
    },
    server: {
      https: true,
      host: true,
      port: Number(VITE_APP_PORT || 3000),
    },
    resolve: {
      alias: [
        {
          find: /^~/,
          replacement: `${path.resolve(__dirname, './node_modules')}/`,
        },
        {
          find: /@\//,
          replacement: `${path.resolve(__dirname, './src')}/`,
        },
      ],
    },
    plugins: vitePlugins,
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
  };
});
