import React from "react";
import renderer from "react-test-renderer";
import { AppConfiguration } from "../../../components";
import { Programmes } from "../../../pages";
import NewProgrammeModal from "../../../pages/Programmes/NewProgrammeModal";
import ExistingProgramme from "../../../pages/Programmes/ExistingProgramme";
import EmptyProgramme from "../../../pages/Programmes/EmptyProgramme";
import InlineRegulations from "../../../pages/Programmes/InlineRegulations";

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

test("Creating programmes should be hidden unless acted on", () => {
    const tree = renderer
        .create(
            <AppConfiguration>
                <NewProgrammeModal />
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

test("Inline Regulations ", () => {
    const tree = renderer
        .create(
            <AppConfiguration>
                <InlineRegulations />
            </AppConfiguration>,
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
