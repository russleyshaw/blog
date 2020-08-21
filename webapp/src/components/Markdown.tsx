import * as React from "react";
import * as ReactMarkdown from "react-markdown";
import * as pathLib from "path";

import MarkdownImage from "./MarkdownImage";
import MarkdownCode from "./MarkdownCode";
import MarkdownParagraph from "./MarkdownParagraph";
import MarkdownHeading from "./MarkdownHeading";
import styled from "styled-components";
import MarkdownRoot from "./MarkdownRoot";

export interface MarkdownProps {
    source: string;
    contentRoot: string;
}

const RootDiv = styled.div`
    display: flex;
    flex-direction: column;
`;

export default function Markdown(props: MarkdownProps): JSX.Element {
    return (
        <RootDiv>
            <ReactMarkdown
                renderers={{
                    root: MarkdownRoot,
                    image: MarkdownImage,
                    code: MarkdownCode,
                    paragraph: MarkdownParagraph,
                    heading: MarkdownHeading,
                }}
                source={props.source}
                transformImageUri={u => transformImageUri(props.contentRoot, u)}
            />
        </RootDiv>
    );
}

function transformImageUri(blogPath: string, imageUri: string): string {
    if (imageUri.startsWith("https://")) {
        return imageUri;
    }
    const newUri = pathLib.resolve(pathLib.dirname(blogPath), imageUri);
    console.log(`Transformed image uri from ${imageUri} to ${newUri}`);
    return newUri;
}
