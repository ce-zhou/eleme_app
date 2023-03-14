import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import postCssPxToRem from "postcss-pxtorem";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // 配置postcss
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          // rootValue: 75, // 1rem的大小
          // 为了适配vant-ui组件库
          rootValue({ file }) {
            return file.indexOf("vant") !== -1 ? 37.5 : 75;
          },
          propList: ["*"], // 需要转换的属性，这里选择全部都进行转换
        }),
      ],
    },
  },
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "https://elm.cangdu.org",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/socket": {
        target: "http://localhost:3000",
        pathRewrite: {
          "^/socket": "",
        },
        ws: true,
        changeOrigin: true,
      },
      "/meituan": {
        target: "https://openapi.waimai.meituan.com/openapi",
        pathRewrite: {
          "^/meituan": "",
        },
        ws: true,
        changeOrigin: true,
      },
    },
  },
});
