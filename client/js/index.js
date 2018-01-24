import 'babel-polyfill';

console.log(`Client running in ${process.env.NODE_ENV} mode`);

import * as actions from "./actions/index";
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";

import store from "./store";
import ListContainer from "./Components/list-container";

document.addEventListener("DOMContentLoaded", () =>
    ReactDOM.render(
        <Provider store={store}>
            <ListContainer />
        </Provider>,
        document.getElementById("app")
    )
);

