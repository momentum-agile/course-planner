import React, { useState } from "react";
import { Flex } from "@chakra-ui/core";
import CourseField from "./CourseField";
import SaveCancelButtonSet from "./SaveCancelButtonSet";
import RegulationTable from "./RegulationTable";

const TYPES = {
    simple: "simple",
    points: "points",
    complex: "complex",
};

const CreateCourse = () => {
    const cancelCreateCourse = () => {
        console.log("CANCEL");
    };

    const saveCreateCourse = () => {
        console.log("SAVE");
    };

    /**
     * Regulations in the form of:
     * {
            points: 0,
            type: "POINTS",
            courses: ["string"],
        }
     */
    const [course, setCourse] = useState({
        name: "string",
        courseCode: "string",
        points: 0,
        semester: "S1",
        prerequisites: [],
        corequisites: [],
        restrictions: [],
        informalEquivalents: [],
        description: "string",
    });

    // TODO: Confirm save to DB
    return (
        <Flex width="100%" justify="left" marginTop="20px" p={4} direction="column">
            <CourseField type={TYPES.simple} title="Course Code" required={true} />
            <CourseField type={TYPES.simple} title="Course Name" />
            <CourseField type={TYPES.simple} title="Description" />
            <CourseField type={TYPES.points} title="Points" required={true} />
            <RegulationTable name="Prerequisites" updateCourse={setCourse} course={course} regulationType={course.prerequisites} />
            <RegulationTable name="Corequisites" updateCourse={setCourse} course={course} regulationType={course.corequisites} />
            <RegulationTable name="Restrictions" updateCourse={setCourse} course={course} regulationType={course.restrictions} />
            <RegulationTable
                name="InformalEquivalents"
                updateCourse={setCourse}
                course={course}
                regulationType={course.informalEquivalents}
            />
            <SaveCancelButtonSet onCancel={cancelCreateCourse} onSave={saveCreateCourse} />
        </Flex>
    );
};

export default CreateCourse;
