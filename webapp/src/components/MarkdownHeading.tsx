import { clamp } from "lodash";
import * as React from "react";
import styled from "styled-components";

const RootDiv = styled.div``;

export default function MdHeading(props: any): JSX.Element {
    console.log(props);
    const level = clamp(3, props.level + 3, 6);

    return <RootDiv>{props.children}</RootDiv>;
}
