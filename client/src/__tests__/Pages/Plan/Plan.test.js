import React from "react";
import renderer from "react-test-renderer";
import { AppConfiguration } from "../../../components";
import { Plan } from "../../../pages";
import Header from "../../../pages/Plan/Header";
import Year from "../../../pages/Plan/Year";

test("<Plan />", () => {
    const tree = renderer
        .create(
            <AppConfiguration>
                <Plan />
            </AppConfiguration>,
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});

test("<Header />", () => {
    const tree = renderer
        .create(
            <AppConfiguration>
                <Header name={"Nisarag"} programme={"SOFTENG 701"} lastSaveDate={new Date()} planName={"HongShi"} />
            </AppConfiguration>,
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
