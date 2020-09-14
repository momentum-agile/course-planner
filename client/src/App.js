import React from "react";
import { Home, Courses, Programmes, Students } from "./pages";
import { Route, Switch } from "react-router-dom";

const App = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/programmes/" component={Programmes} />
                <Route path="/programmes/:id" component={Programmes} />
                <Route exact path="/students" component={Students} />
                <Route exact path="/courses" component={Courses} />
            </Switch>
        </div>
    );
};

export default App;
