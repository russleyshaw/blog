import * as React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import styled from "styled-components";

const RootButton = styled.button<{ active?: boolean }>``;

export default function NavButton(props: {
    exact?: boolean;
    title: string;
    to: string;
}): JSX.Element {
    const match = useRouteMatch({ exact: props.exact, path: props.to });
    const history = useHistory();

    return <RootButton onClick={() => history.push(props.to)}>{props.title}</RootButton>;
}
