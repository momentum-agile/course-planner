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

const EditRequirementsBox = ({ closeEdit, programme, notifyUpdate, regulation, heading }) => {
    const { data } = useCourses();
    const { updateProgramme } = useProgrammes();
    const [courses, setCourses] = useState([]);
    const [points, setPoints] = useState(15);
    const [pointRequirement, setPointRequirement] = useState("EXACTLY");

    const handleAddCourse = (courseId) => {
        if (courseId !== "") {
            const foundCourse = data.find((course) => course._id === courseId);
            if (!courses.includes(foundCourse)) {
                setCourses((oldCourses) => [...oldCourses, foundCourse]);
            }
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
            color="white"
            bg="#e2e2e2"
            padding="5px"
        >
            <Text textAlign="center" fontSize="md" color="#000000" as="i">
                {heading}
            </Text>
            <Flex justify="space-evenly">
                <Flex direction="column" width="20%" align="center">
                    <Select width="100%" bg="#303030" value={pointRequirement} onChange={(e) => setPointRequirement(e.target.value)}>
                        <option value="EXACTLY">Exactly</option>
                        <option value="ATLEAST">At Least</option>
                        <option value="UPTO">Up to</option>
                    </Select>
                </Flex>
                <NumberInput step={5} min={0} height="40px" width="15%" bg="#303030" value={points} onChange={(value) => setPoints(value)}>
                    <NumberInputField bg="#303030" />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <Text color="black">From</Text>
                <Flex direction="column" width="45%" align="center">
                    <Select placeholder="select courses" bg="#303030" width="80%" onChange={(e) => handleAddCourse(e.target.value)}>
                        {data.map((course) => (
                            <option key={course._id} value={course._id}>
                                {course.courseCode}
                            </option>
                        ))}
                    </Select>
                    <Flex
                        className="programmeRequirements"
                        bg="#565656"
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
                                    borderColor="white"
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
                                    color="#ff0000"
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
                    color={courses.length !== 0 && points > 0 ? "green.400" : "grey"}
                    onClick={() => handleUpdateRegulation()}
                    bottom="5px"
                    cursor={courses.length !== 0 && points > 0 ? "pointer" : "default"}
                />
            </Flex>
        </Flex>
    );
};

export default EditRequirementsBox;
