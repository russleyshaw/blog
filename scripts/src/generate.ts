import { flatten } from "lodash";
import { promises as fsp } from "fs";
import * as path from "path";

import * as matter from "gray-matter";
import { filterNil, asString, asOptional, asDateString } from "common/dist/util";
import { getSlugFromTitle } from "common/dist/blog";

async function main(): Promise<void> {
    const blogDir = path.resolve(
        process.cwd(),
        asString(process.argv[2], "Expected blog directory to be provided as the first arg.")
    );
    const outPath = path.resolve(
        process.cwd(),
        asString(process.argv[3], "Expected output to be provided as the second arg.")
    );

    console.log("Blog dir", blogDir);
    console.log("Output path", outPath);

    const mdFiles = await readDeepDir(blogDir).then(fs => fs.filter(f => f.endsWith(".md")));

    const infoList = await Promise.all(
        mdFiles.map(async mdFileName => {
            try {
                const data = await fsp.readFile(mdFileName, "utf8");
                const info = matter(data);

                const title = asString(info.data.title, "Expected title to be a string.");
                const slug = asString(
                    info.data.slug ?? getSlugFromTitle(title),
                    "Expected slug to be a string"
                );
                const created = asDateString(
                    info.data.created,
                    "Expected created to be a date string."
                );
                const updated = asOptional(info.data.updated, v => asDateString(v)) ?? null;

                const mdPath = path.relative(blogDir, mdFileName);

                return {
                    title,
                    slug,
                    created,
                    updated,
                    path: mdPath,
                };
            } catch (e) {
                console.warn(`Unable to read blog at ${mdFileName}`);
                console.warn(e);
            }
        })
    ).then(filterNil);

    await fsp.writeFile(outPath, JSON.stringify(infoList, null, 4));
}

async function readDeepDir(dir: string): Promise<string[]> {
    const subPaths = await fsp.readdir(dir);

    const files = await Promise.all(
        subPaths
            .map(p => path.join(dir, p))
            .map(async p => {
                const stats = await fsp.stat(p);
                if (stats.isDirectory()) {
                    return await readDeepDir(p);
                }

                return [p];
            })
    );

    return flatten(files);
}

main().catch(e => console.error(e));
