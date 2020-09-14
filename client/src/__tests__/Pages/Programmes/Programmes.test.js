import React from "react";
import renderer from "react-test-renderer";
import { AppConfiguration } from "../../../components";
import { Programmes } from "../../../pages";
import NewProgramme from "../../../pages/Programmes/NewProgramme";
import ExistingProgramme from "../../../pages/Programmes/ExistingProgramme";
import EmptyProgramme from "../../../pages/Programmes/EmptyProgramme";

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
    let programme = {
        name: "SOFTENG761",
        regulations: [
            {
                points: 15,
                pointRequirement: "ATLEAST",
                courses: [],
            },
        ],
        defaultPlan: null,
    };

    const tree = renderer
        .create(
            <AppConfiguration>
                <ExistingProgramme id={"fakeProgrammeID"} programme={programme} />
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
