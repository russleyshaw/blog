import * as React from "react";
import styled from "styled-components";

import NavButton from "./NavButton";

const RootDiv = styled.div`
    display: flex;
    flex-direction: row;
`;

export default function NavBar(): JSX.Element {
    return (
        <RootDiv>
            <NavButton exact title="Home" to="/" />
            <NavButton title="Posts" to="/posts" />
        </RootDiv>
    );
}
