import React from "react";
import renderer from "react-test-renderer";
import { AppConfiguration } from "../../../components";
import { Students } from "../../../pages";

test("Main Students Page", () => {
    const tree = renderer
        .create(
            <AppConfiguration>
                <Students />
            </AppConfiguration>,
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
