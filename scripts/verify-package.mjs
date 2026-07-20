import assert from "node:assert/strict";
import {execFileSync} from "node:child_process";
import {createRequire} from "node:module";
import {existsSync, readFileSync, readdirSync, statSync} from "node:fs";
import path from "node:path";
import {pathToFileURL} from "node:url";

const packageJson = JSON.parse(readFileSync("package.json", "utf8"));

assert.deepStrictEqual(Object.keys(packageJson.scripts ?? {}).sort(), ["build", "test"]);
assert.equal(packageJson.sideEffects, false);
assert.equal(packageJson.license, "MIT");
assert.equal(packageJson.publishConfig?.access, "public");
assert.match(packageJson.packageManager ?? "", /^npm@/);
assert.ok(existsSync("package-lock.json"), "npm lockfile is required");
assert.ok(!existsSync("pnpm-lock.yaml"), "pnpm lockfile must not exist");

for (const file of ["dist/index.js", "dist/index.cjs", "dist/index.d.ts"]) {
    assert.ok(existsSync(file) && statSync(file).isFile(), `missing package artifact: ${file}`);
}

const esm = await import(pathToFileURL(path.resolve("dist/index.js")).href);
const cjs = createRequire(import.meta.url)(path.resolve("dist/index.cjs"));
assert.deepStrictEqual(Object.keys(cjs).sort(), Object.keys(esm).sort(), "ESM and CJS exports differ");
for (const module of [esm, cjs]) {
    assert.equal(typeof module.default?.writer, "function", "default writer factory is missing");
    assert.equal(typeof module.default?.reader, "function", "default reader factory is missing");
}

for (const file of walk("dist", candidate => candidate.endsWith(".d.ts"))) {
    const source = readFileSync(file, "utf8");
    assert.ok(!source.includes('"@') && !source.includes("'@"), `unresolved @ alias in ${file}`);
    for (const match of source.matchAll(/(?:from\s+|import\s*)["']([^"']+)["']/g)) {
        const specifier = match[1];
        if (specifier.startsWith(".")) {
            assert.equal(path.extname(specifier), ".js", `extensionless declaration import in ${file}: ${specifier}`);
        }
    }
}

const output = execFileSync(process.execPath, [npmCli(), "pack", "--dry-run", "--json"], {encoding: "utf8"});
const [pack] = JSON.parse(output);
const files = new Set(pack.files.map(file => file.path));
for (const required of ["package.json", "README.md", "LICENSE.md", "dist/index.js", "dist/index.cjs", "dist/index.d.ts"]) {
    assert.ok(files.has(required), `npm package is missing ${required}`);
}
for (const file of files) {
    assert.ok(!file.startsWith("src/"), `npm package includes source file ${file}`);
    assert.ok(!file.startsWith("tests/"), `npm package includes test file ${file}`);
    assert.ok(!file.startsWith("scripts/"), `npm package includes build script ${file}`);
}

console.log("Package verification passed.");

function npmCli() {
    const cli = process.env.npm_execpath;
    assert.ok(cli, "npm_execpath is required for package verification");
    return cli;
}

function walk(directory, predicate) {
    const files = [];
    for (const entry of readdirSync(directory, {withFileTypes: true})) {
        const current = path.join(directory, entry.name);
        if (entry.isDirectory()) files.push(...walk(current, predicate));
        else if (entry.isFile() && predicate(current)) files.push(current);
    }
    return files;
}
