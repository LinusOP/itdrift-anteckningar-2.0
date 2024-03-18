import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

// Remark/Rehype plugins
import remarkGFM from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeExternalLinks from "rehype-external-links";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
  output: "hybrid",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  markdown: {
    remarkPlugins: [remarkGFM, remarkMath],
    rehypePlugins: [
      [
        rehypeKatex,
        {
          macros: {
            ",": "{\\char`,}",
          },
          trust: true,
          fleqn: true,
          strict: false,
        },
      ],
      [
        rehypeExternalLinks,
        {
          target: "_blank",
        },
      ],
    ],
    shikiConfig: {
      wrap: true,
    },
  },
});
