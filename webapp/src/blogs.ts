import blogs from "../blog-index.json";
import { sortBy } from "lodash";

const parsedBlogs = blogs.map(b => ({
    ...b,
    created: new Date(b.created),
}));

export type BlogInfo = typeof parsedBlogs[0];

export function getSortedBlogs(): BlogInfo[] {
    return sortBy(parsedBlogs, b => b.created.valueOf());
}

export function getBlogBySlug(slug: string): BlogInfo | undefined {
    return parsedBlogs.find(b => b.slug === slug);
}
