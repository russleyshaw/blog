import * as React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface IconButtonProps {
    minimal?: boolean;
    icon: IconProp;
    onClick?(): void;
    title?: string;
    href?: string;
    color?: string;
}

const Button = styled.button`
    padding: 4px;
`;

export default function IconButton(props: IconButtonProps): JSX.Element {
    const but = (
        <Button title={props.title} onClick={props.onClick}>
            <FontAwesomeIcon color={props.color} icon={props.icon} />
        </Button>
    );

    if (props.href != null) {
        return (
            <a href={props.href} title={`Open ${props.href} in new tab.`} target="_blank">
                {but}
            </a>
        );
    }

    return but;
}
