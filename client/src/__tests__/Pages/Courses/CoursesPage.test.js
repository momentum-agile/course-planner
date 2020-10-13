import React from "react";
import renderer from "react-test-renderer";
import { AppConfiguration } from "../../../components";
import { Courses } from "../../../pages";
import CourseView from "../../../pages/Courses/CourseView";
import EmptyCourse from "../../../pages/Courses/EmptyCourse";
import PopulateAPIModal from "../../../pages/Courses/PopulateAPIModal";
import RegulationModal from "../../../pages/Courses/RegulationModal";

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

test("UoA API Populate Courses Modal", () => {
    const tree = renderer
        .create(
            <AppConfiguration>
                <PopulateAPIModal />
            </AppConfiguration>,
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});

test("Empty Courses", () => {
    const tree = renderer
        .create(
            <AppConfiguration>
                <EmptyCourse />
            </AppConfiguration>,
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});

test("Modal to add Regulations for Courses", () => {
    const tree = renderer
        .create(
            <AppConfiguration>
                <RegulationModal />
            </AppConfiguration>,
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
