import * as React from "react";
import styled from "styled-components";

const Root = styled.p``;

export default function MdParagraph(props: any): JSX.Element {
    return <Root>{props.children}</Root>;
}
