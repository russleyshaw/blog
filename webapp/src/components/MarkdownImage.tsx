import * as React from "react";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

import IconButton from "./IconButton";

const RootDiv = styled.div`
    position: relative;
    overflow: hidden;
`;

const CaptionDiv = styled.div<{ open: boolean }>`
    position: absolute;
    bottom: 10px;
    right: ${props => (props.open ? "10px" : "-1000px")};
    transition: right 200ms;
    background-color: white;
    border-radius: 4px;
    padding: 4px;
    border: 1px solid black;
`;

const AltCaption = styled.span`
    margin-right: 8px;
`;

export default function MarkdownImage(props: any): JSX.Element {
    const [open, setOpen] = React.useState(false);

    return (
        <RootDiv onPointerEnter={() => setOpen(true)} onPointerLeave={() => setOpen(false)}>
            <img {...props} width={"100%"} />
            <CaptionDiv open={open}>
                <AltCaption>{props.alt}</AltCaption>
                <IconButton href={props.src} icon={faExternalLinkAlt} />
            </CaptionDiv>
        </RootDiv>
    );
}
