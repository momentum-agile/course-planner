import React from "react";
import renderer from "react-test-renderer";
import { HomePage } from "../../../pages";
import { AppConfiguration } from "../../../components";

test("<HomePage />", () => {
    const tree = renderer
        .create(
            <AppConfiguration>
                <HomePage />
            </AppConfiguration>,
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
