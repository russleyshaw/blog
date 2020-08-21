import * as React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

import NavBar from "../components/NavBar";

import HomePage from "../pages/Home";
import PostListPage from "../pages/PostList";
import PostPage from "../pages/Post";

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    width: 100%;
    height: 100%;
    margin: 0px;
    padding: 0px;
  }
`;

const RootDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 650px;
    margin: 0 auto;
`;

export default function RootView(): JSX.Element {
    return (
        <RootDiv>
            <GlobalStyle />
            <Router basename="/">
                <NavBar />
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/posts" exact component={PostListPage} />
                    <Route path="/posts/:slug" component={PostPage} />
                </Switch>
            </Router>
        </RootDiv>
    );
}
