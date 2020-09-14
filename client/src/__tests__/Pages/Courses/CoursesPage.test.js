import React from "react";
import renderer from "react-test-renderer";
import { AppConfiguration } from "../../../components";
import { Courses } from "../../../pages";

test("<Courses />", () => {
    const tree = renderer
        .create(
            <AppConfiguration>
                <Courses />
            </AppConfiguration>,
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
