import React from "react";
import renderer from "react-test-renderer";
import { AppConfiguration } from "../../../components";
import { Programmes, ExistingProgramme, EmptyProgramme, NewProgramme } from "../../../pages";

test("Main Programmes Page", () => {
    const tree = renderer
        .create(
            <AppConfiguration>
                <Programmes />
            </AppConfiguration>,
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});

test("Creating new programmes sub-page ", () => {
    const tree = renderer
        .create(
            <AppConfiguration>
                <NewProgramme />
            </AppConfiguration>,
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});

test("Existing programmes sub-page ", () => {
    const tree = renderer
        .create(
            <AppConfiguration>
                <ExistingProgramme />
            </AppConfiguration>,
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});

test("Empty programmes sub-page ", () => {
    const tree = renderer
        .create(
            <AppConfiguration>
                <EmptyProgramme />
            </AppConfiguration>,
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
