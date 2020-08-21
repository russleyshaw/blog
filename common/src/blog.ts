export function getSlugFromTitle(title: string): string {
    return title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
}

export function stripFrontMatter(text: string): string {
    return text.replace(/^---\r?\n(?:.*\r?\n)+---$/gm, "");
}
