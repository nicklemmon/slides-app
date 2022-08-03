import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import hljs from "highlight.js";
import { Mode } from "vite-plugin-markdown";
import { plugin as mdPlugin } from "vite-plugin-markdown";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mdPlugin({
      mode: [Mode.HTML],
      markdownIt: {
        html: true,
        highlight: handleHighlighting,
      },
    }),
  ],
});

function handleHighlighting(str: string, lang?: string) {
  if (lang) {
    try {
      return `<pre class="hljs"><code>${
        hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
      }</code></pre>`;
    } catch (err) {
      console.log(err);

      console.warn("Syntax highlighting failed");
    }
  }
}
