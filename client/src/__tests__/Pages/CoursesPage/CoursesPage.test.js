import React from "react";
import renderer from "react-test-renderer";
import { AppConfiguration } from "../../../components";
import { CoursesPage } from "../../../pages";

test("<CoursesPage />", () => {
    const tree = renderer.create(
        <AppConfiguration>
            <CoursesPage />
        </AppConfiguration>
    ).toJSON();

    expect(tree).toMatchSnapshot();
})