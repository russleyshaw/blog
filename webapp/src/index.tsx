// Make sure react-hot-loader is required before react and react-dom:
import "react-hot-loader";

import "core-js/stable";
import "regenerator-runtime/runtime";

import * as React from "react";
import * as ReactDOM from "react-dom";

import RootView from "./views/RootView";

ReactDOM.render(<RootView />, document.getElementById("root"));
