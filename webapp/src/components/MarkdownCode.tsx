import * as React from "react";
import styled from "styled-components";

import highlight from "../highlight";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import IconButton from "./IconButton";
import { useLoader } from "../util";

const RootDiv = styled.div`
    border: 1px solid black;
    position: relative;
    overflow: hidden;
`;

const CaptionDiv = styled.div<{ open: boolean }>`
    position: absolute;
    right: ${props => (props.open ? "10px" : "-1000px")};
    bottom: 10px;
    transition: right 200ms;
`;

const Pre = styled.pre`
    margin: 0px;
    padding: 8px;
    overflow: auto;

    color: hsl(0, 0%, 85%);
    background-color: hsl(0, 0%, 15%);
`;

export default function MarkdownCode(props: any): JSX.Element {
    const highlightedCode = useLoader(() => highlight(props.language, props.value), [
        props.language,
        props.value,
    ]);

    const [open, setOpen] = React.useState(false);
    const [copied, setCopied] = React.useState(false);

    return (
        <RootDiv onPointerEnter={() => setOpen(true)} onPointerLeave={() => setOpen(false)}>
            <Pre>
                <code
                    dangerouslySetInnerHTML={{ __html: highlightedCode.value ?? props.value }}
                ></code>
            </Pre>
            <CaptionDiv open={open}>
                <IconButton
                    color={copied ? "green" : undefined}
                    icon={copied ? faCheck : faCopy}
                    title="Copy code to clipboard."
                    onClick={() => {
                        navigator.clipboard.writeText(props.value);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 5 * 1000);
                    }}
                />
            </CaptionDiv>
        </RootDiv>
    );
}
