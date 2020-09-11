import React from "react";
import { HomePage, CoursesPage, Programmes, Students } from "./pages";
import { Route, Switch } from "react-router-dom";

const App = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/programmes/" component={Programmes} />
                <Route exact path="/students" component={Students} />
                <Route exact path="/courses" component={CoursesPage} />
            </Switch>
        </div>
    );
};

export default App;
