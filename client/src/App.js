import React from "react";
import { Route, Switch } from "react-router-dom";
import { HomePage, CoursesPage, Programmes } from "./pages";

const App = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/programmes/" component={Programmes} />
                <Route exact path="/courses" component={CoursesPage} />
            </Switch>
        </div>
    );
};

export default App;
