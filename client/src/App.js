import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { HomePage, Programmes } from "./pages";

const App = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/programmes/" component={Programmes} />
            </Switch>
        </div>
    );
};

export default withRouter(App);
