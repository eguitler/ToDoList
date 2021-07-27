import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Global } from "@emotion/react";

import Home from "./pages/Home";
import GlobalStyles from "./globalStyles/styles";

function App() {
    return (
        <Router>
            <Global styles={GlobalStyles} />
            <Switch>
                <Route exact path="/" component={Home} />
            </Switch>
        </Router>
    );
}

export default App;
