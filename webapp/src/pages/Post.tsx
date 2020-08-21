import * as React from "react";
import * as fetch from "isomorphic-fetch";
import { useParams } from "react-router-dom";
import * as pathLib from "path";

import * as moment from "moment";

import { useLoader, LoaderStatus } from "../util";
import { BASE_PATH } from "../vars";
import { getBlogBySlug, BlogInfo } from "../blogs";

import { stripFrontMatter } from "common/dist/blog";

import Markdown from "../components/Markdown";

interface Params {
    slug: string;
}

export default function PostPage(): JSX.Element {
    const { slug } = useParams<Params>();

    const blog = getBlogBySlug(slug);
    if (blog == null) {
        return <div>Not Found</div>;
    }

    return <PostPageFound blog={blog} />;
}

function PostPageFound(props: { blog: BlogInfo }): JSX.Element {
    const { blog } = props;

    const blogPath = pathLib.resolve(BASE_PATH, "blogs", blog.path);

    // Get content
    const result = useLoader(async () => {
        const fetched = await fetch(blogPath, {});
        if (!fetched.ok) throw new Error("Unable to get blog.");
        const text = await fetched.text();
        return stripFrontMatter(text);
    }, [blogPath]);

    return (
        <React.Fragment>
            <h3>{blog.title}</h3>
            <span>Created: {moment(blog.created).fromNow()}</span>

            {result.status == LoaderStatus.loaded && (
                <Markdown contentRoot={blogPath} source={result.value ?? ""} />
            )}
        </React.Fragment>
    );
}
