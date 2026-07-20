import {fileURLToPath} from "node:url";
import {defineConfig} from "vite";

const sourceRoot = fileURLToPath(new URL("./src", import.meta.url));
const sourceEntry = fileURLToPath(new URL("./src/index.ts", import.meta.url));

/** Production library build for ESM and CommonJS consumers. */
export default defineConfig({
    resolve: {
        alias: {
            "@": sourceRoot
        }
    },
    build: {
        target: "es2022",
        outDir: "dist",
        emptyOutDir: true,
        minify: true,
        sourcemap: true,
        lib: {
            entry: sourceEntry,
            formats: ["es", "cjs"],
            fileName: format => format === "es" ? "index.js" : "index.cjs"
        },
        rolldownOptions: {
            treeshake: true,
            output: {
                exports: "named"
            }
        }
    }
});
