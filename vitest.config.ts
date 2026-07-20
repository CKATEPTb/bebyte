import {fileURLToPath} from "node:url";
import {defineConfig} from "vitest/config";

const sourceRoot = fileURLToPath(new URL("./src", import.meta.url));
const testRoot = fileURLToPath(new URL("./tests", import.meta.url));

/** Vitest configuration for source, boundary, and package-contract tests. */
export default defineConfig({
    resolve: {
        alias: {
            "@": sourceRoot,
            "@test": testRoot
        }
    },
    test: {
        environment: "node",
        globals: true,
        include: ["tests/**/*.test.ts"],
        exclude: ["node_modules/**", "dist/**"]
    }
});
