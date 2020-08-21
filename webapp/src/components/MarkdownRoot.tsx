import * as React from "react";
import styled from "styled-components";

const RootDiv = styled.div`
    display: flex;
    flex-direction: column;
`;

export default function MarkdownRoot(props: any) {
    return <RootDiv>{props.children}</RootDiv>;
}
