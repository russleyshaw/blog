import { promises as fsp } from "fs";
import { getSlugFromTitle } from "common/dist/blog";

import prompts from "prompts";

async function main(): Promise<void> {
    const created = new Date().toISOString();
    const response = await prompts({
        name: "title",
        type: "text",
        message: "Title?",
    });

    const title = response.title as string;
    const slug = getSlugFromTitle(title);
    // prettier-ignore
    const fileText = [
        "---",
        `title: "${title}"`,
        `created: "${created}"`,
        "---"
    ].join("\n");

    const newPath = `./blogs/${slug}.md`;
    await fsp.writeFile(newPath, fileText);
    console.log(`Created ${newPath}`);
}

main();
