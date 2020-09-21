import React, { useState, useEffect } from "react";
import {
    Flex,
    Text,
    Box,
    Select,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from "@chakra-ui/core";
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineClose } from "react-icons/ai";
import useCourses from "../Courses/useCourses";
import useProgrammes from "./useProgrammes";
import { SingleSelect } from "../../components/";
import { colors as c } from "../../colors";

const EditRequirementsBox = ({ closeEdit, programme, notifyUpdate, regulation, heading }) => {
    const { data } = useCourses();
    const { updateProgramme } = useProgrammes();
    const [courses, setCourses] = useState([]);
    const [points, setPoints] = useState(15);
    const [pointRequirement, setPointRequirement] = useState("EXACTLY");

    const handleAddCourse = (course) => {
        if (!courses.includes(course)) {
            setCourses((oldCourses) => [...oldCourses, course]);
        }
    };

    const handleRemoveCourse = (courseId) => {
        const filteredCourses = courses.filter((course) => course._id !== courseId);
        setCourses(filteredCourses);
    };
    const handleUpdateRegulation = () => {
        if (courses.length !== 0 && points > 0) {
            if (regulation === null) {
                programme.regulations.push({ courses, points, pointRequirement });
            } else {
                const foundRegulationIndex = programme.regulations.findIndex((r) => r._id === regulation._id);
                programme.regulations[foundRegulationIndex] = {
                    ...programme.regulations[foundRegulationIndex],
                    courses,
                    points,
                    pointRequirement,
                };
            }
            updateProgramme(programme, notifyUpdate);
            closeEdit();
        }
    };

    useEffect(() => {
        if (regulation !== null) {
            setCourses(data.filter((course) => regulation.courses.includes(course._id)));
            setPointRequirement(regulation.pointRequirement);
            setPoints(regulation.points);
        } else {
            setCourses([]);
            setPointRequirement("EXACTLY");
            setPoints(15);
        }
    }, [regulation, data]);

    return (
        <Flex
            alignItems="center"
            alignSelf="center"
            direction="column"
            textAlign="flex-start"
            marginTop="20px"
            height="150px"
            width="85%"
            color={c.white}
            bg={c.whiteGrey}
            padding="5px"
        >
            <Text textAlign="center" fontSize="md" color={c.black} as="i">
                {heading}
            </Text>
            <Flex justify="space-evenly">
                <Flex direction="column" width="20%" align="center">
                    <Select width="100%" bg={c.darkGrey} value={pointRequirement} onChange={(e) => setPointRequirement(e.target.value)}>
                        <option value="EXACTLY">Exactly</option>
                        <option value="ATLEAST">At Least</option>
                        <option value="UPTO">Up to</option>
                    </Select>
                </Flex>
                <NumberInput
                    step={5}
                    min={0}
                    height="40px"
                    width="15%"
                    bg={c.darkGrey}
                    value={points}
                    onChange={(value) => setPoints(value)}
                >
                    <NumberInputField bg={c.darkGrey} />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <Text color={c.black}>From</Text>
                <Flex direction="column" width="45%" align="center">
                    <SingleSelect
                        onChange={(course) => handleAddCourse(course)}
                        data={data.map((course) => ({ value: course, label: course.courseCode }))}
                        placeholder="Add courses"
                    />
                    <Flex
                        className="programmeRequirements"
                        bg={c.darkGrey}
                        minHeight="40px"
                        maxHeight="70px"
                        width="100%"
                        overflowY="scroll"
                        flexWrap="wrap"
                        padding="5px"
                    >
                        {courses.map((course) => (
                            <Flex>
                                <Text
                                    key={course._id}
                                    border="solid"
                                    borderColor={c.white}
                                    borderRadius="20px"
                                    borderWidth="1px"
                                    fontSize="12px"
                                    padding="3px"
                                    margin="2px"
                                >
                                    {course.courseCode}
                                </Text>
                                <Box
                                    as={AiOutlineClose}
                                    position="relative"
                                    size="12px"
                                    right="10px"
                                    color={c.red}
                                    cursor="pointer"
                                    onClick={() => handleRemoveCourse(course._id)}
                                />
                            </Flex>
                        ))}
                    </Flex>
                </Flex>
                {/* Buttons to be refactored */}
                <Box as={AiOutlineCloseCircle} size="32px" color="red.400" onClick={closeEdit} bottom="5px" cursor="pointer" />
                <Box
                    as={AiOutlineCheckCircle}
                    size="32px"
                    color={courses.length !== 0 && points > 0 ? c.green : "grey"}
                    onClick={() => handleUpdateRegulation()}
                    bottom="5px"
                    cursor={courses.length !== 0 && points > 0 ? "pointer" : "default"}
                />
            </Flex>
        </Flex>
    );
};

export default EditRequirementsBox;
