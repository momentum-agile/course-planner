import React from "react";
import { HomePage, CoursesPage, ProgrammesPage, Students } from "./pages";
import { Route, Switch } from "react-router-dom";

const App = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/programmes/" component={ProgrammesPage} />
                <Route path="/programmes/:id" component={ProgrammesPage} />
                <Route exact path="/students" component={Students} />
                <Route exact path="/courses" component={CoursesPage} />
            </Switch>
        </div>
    );
};

export default App;
