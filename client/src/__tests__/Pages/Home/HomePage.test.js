import React from "react";
import renderer from "react-test-renderer";
import { Home } from "../../../pages";
import { AppConfiguration } from "../../../components";

test("<Home />", () => {
    const tree = renderer
        .create(
            <AppConfiguration>
                <Home />
            </AppConfiguration>,
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
