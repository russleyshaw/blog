import * as React from "react";
import { Link } from "react-router-dom";

import * as moment from "moment";
import { getSortedBlogs } from "../blogs";

const blogs = getSortedBlogs();

export default function PostListPage(): JSX.Element {
    return (
        <React.Fragment>
            <h3>Recent Posts</h3>
            {blogs.map(blog => (
                <span key={blog.slug}>
                    <Link to={`/posts/${blog.slug}`}>{blog.title}</Link> -{" "}
                    {moment(blog.created).fromNow()}
                </span>
            ))}
        </React.Fragment>
    );
}
