import {readdir, readFile, writeFile} from "node:fs/promises";
import path from "node:path";

const distRoot = path.resolve("dist");

for (const file of await declarationFiles(distRoot)) {
    const source = await readFile(file, "utf8");
    const rewritten = source.replace(/(["'])@(?:\/([^"']+))?\1/g, (_, quote, target = "index.js") => {
        const moduleTarget = path.extname(target) ? target : `${target}.js`;
        const absoluteTarget = path.join(distRoot, moduleTarget);
        let relative = path.relative(path.dirname(file), absoluteTarget).replaceAll(path.sep, "/");
        if (!relative.startsWith(".")) relative = `./${relative}`;
        return `${quote}${relative}${quote}`;
    });
    if (rewritten !== source) await writeFile(file, rewritten);
}

async function declarationFiles(directory) {
    const entries = await readdir(directory, {withFileTypes: true});
    return (await Promise.all(entries.map(async entry => {
        const current = path.join(directory, entry.name);
        if (entry.isDirectory()) return declarationFiles(current);
        return entry.isFile() && entry.name.endsWith(".d.ts") ? [current] : [];
    }))).flat();
}
