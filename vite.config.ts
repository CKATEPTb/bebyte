import {fileURLToPath} from "node:url";
import {defineConfig} from "vite";

const sourceRoot = fileURLToPath(new URL("./src", import.meta.url));
const sourceEntry = fileURLToPath(new URL("./src/index.ts", import.meta.url));

/** Production ESM library build. */
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
            formats: ["es"],
            fileName: "index"
        },
        rolldownOptions: {
            treeshake: true,
            output: {
                exports: "named"
            }
        }
    }
});
