import React, { useState } from "react";
import { Flex, Button, Text, useToast } from "@chakra-ui/core";
import { colors as c } from "../../colors";
import CourseField from "./CourseField";
import SaveCancelButtonSet from "./SaveCancelButtonSet";
import RegulationTable from "./RegulationTable";

const TYPES = {
    simple: "simple",
    points: "points",
    complex: "complex",
};

// Matches softeng370, softeng 370, SOFTENG 325, Softeng700LVL (which is a course) and so on
const validCourseCodeRegex = /^([A-Za-z])*(\s?)([1-9][0-9][0-9])([A-Za-z]{0,3})$/;

const CreateCourse = ({ prefillCourse }) => {
    const toast = useToast();

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
        name: "",
        courseCode: "",
        points: 15,
        semester: "S1",
        prerequisites: [],
        corequisites: [],
        restrictions: [],
        informalEquivalents: [],
        description: "",
    });

    const validCourseCode = validCourseCodeRegex.test(course.courseCode);

    const handleInputChange = (key) => (val) => {
        setCourse({
            ...course,
            [key]: val,
        });
    };

    const handlePrefill = () => {
        const courseCodeArr = course.courseCode.split(/(\d+)/).filter((e) => e !== "");
        const subject = courseCodeArr[0];
        const courseCode = courseCodeArr.length === 2 ? courseCodeArr[1] : `${courseCodeArr[1]}${courseCodeArr[2]}`;

        const toastBase = {
            title: `Error 404 Course Code Not Found`,
            status: "error",
            duration: 9000,
            isClosable: true,
        };

        prefillCourse(subject.trim(), courseCode.trim())
            .then((res) => {
                setCourse(res);
            })
            .catch((e) => toast({ ...toastBase, description: `Course Code: ${course.courseCode} could not be found on the UoA API` }));
    };

    // TODO: Confirm save to DB
    return (
        <Flex width="100%" justify="left" marginTop="20px" p={4} direction="column">
            <Flex height="100%" width="50%">
                {validCourseCode && (
                    <Button variantColor="blue" backgroundColor={c.lightBlue} onClick={handlePrefill}>
                        <Text textAlign="center" color={c.white}>
                            Prefill information from UoA API
                        </Text>
                    </Button>
                )}
            </Flex>
            <CourseField
                value={course.courseCode}
                type={TYPES.simple}
                title="Course Code"
                required={true}
                onChange={(e) => handleInputChange("courseCode")(e)}
            />
            <CourseField value={course.name} type={TYPES.simple} title="Course Name" onChange={(e) => handleInputChange("name")(e)} />
            <CourseField
                value={course.description}
                type={TYPES.simple}
                title="Description"
                onChange={(e) => handleInputChange("description")(e)}
            />
            <CourseField
                value={course.points}
                type={TYPES.points}
                title="Points"
                required={true}
                onChange={(e) => handleInputChange("points")(e.target.value)}
            />
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
