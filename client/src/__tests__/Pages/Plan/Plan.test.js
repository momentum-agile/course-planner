import React from "react";
import renderer from "react-test-renderer";
import { AppConfiguration } from "../../../components";
import { Plan } from "../../../pages";

test("<Plan />", () => {
    const tree = renderer
        .create(
            <AppConfiguration>
                <Plan />
            </AppConfiguration>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
})