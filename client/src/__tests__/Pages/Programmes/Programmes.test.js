import React from "react";
import renderer from "react-test-renderer";
import { AppConfiguration } from "../../../components";
import { ProgrammesPage } from "../../../pages";
import NewProgramme from "../../../pages/Programmes/NewProgramme";
import ExistingProgramme from "../../../pages/Programmes/ExistingProgramme";
import EmptyProgramme from "../../../pages/Programmes/EmptyProgramme";
import MomentumClient from "../../../common/MomentumClient";

test("Main Programmes Page", () => {
    const tree = renderer
        .create(
            <AppConfiguration>
                <ProgrammesPage />
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
    let firstCourse;

    const tree = renderer
        .create(
            <AppConfiguration>
                <ExistingProgramme id={"fakeProgrammeID"} />
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
