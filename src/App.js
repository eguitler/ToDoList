import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Global } from "@emotion/react";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "store";

import Home from "./pages/Home";
import GlobalStyles from "./globalStyles/styles";

function App() {
    return (
        <Provider store={store}>
            <PersistGate
                loading={<p>LOADING.....</p>}
                persistor={persistor}
            ></PersistGate>
            <Router>
                <Global styles={GlobalStyles} />
                <Switch>
                    <Route exact path="/" component={Home} />
                </Switch>
            </Router>
        </Provider>
    );
}

export default App;
