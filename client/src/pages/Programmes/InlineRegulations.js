import React, { useState, useEffect } from "react";
import {
    Flex,
    Text,
    Select,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    PseudoBox,
    IconButton,
    Tag,
    TagLabel,
    TagCloseButton,
} from "@chakra-ui/core";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import useCourses from "../Courses/useCourses";
import useProgrammes from "./useProgrammes";
import { SingleSelect } from "../../components";
import { colors as c } from "../../colors";
import { useHorizontalScroll } from "./scrollHook";

const InlineRegulations = ({ closeEdit, programme, notifyUpdate, regulation }) => {
    const { data } = useCourses();
    const { updateProgramme } = useProgrammes();
    const [courses, setCourses] = useState([]);
    const [points, setPoints] = useState(15);
    const [pointRequirement, setPointRequirement] = useState("EXACTLY");

    const handleRemoveCourse = (courseId) => {
        const filteredCourses = courses.filter((course) => course._id !== courseId);
        setCourses(filteredCourses);
    };

    const handleUpdateRegulation = () => {
        if (courses.length !== 0 && points > 0) {
            if (regulation === undefined) {
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
        if (regulation !== undefined && regulation.courses) {
            setCourses(data.filter((course) => regulation.courses.includes(course._id)));
            setPointRequirement(regulation.pointRequirement);
            setPoints(regulation.points);
        } else {
            setCourses([]);
            setPointRequirement("EXACTLY");
            setPoints(15);
        }
    }, [regulation, data]);

    const scrollRef = useHorizontalScroll();

    return (
        <PseudoBox
            height="50px"
            width="100%"
            paddingLeft="3px"
            paddingRight="3px"
            bg={c.white}
            borderRadius="2px"
            borderBottom={`solid 1px ${c.whiteGrey}`}
            flex-direction="row"
            alignItems="center"
            textAlign="center"
            justify="space-around"
            color={c.midnightBlue}
        >
            <Flex justify="space-around" align="center" height="100%">
                {/* Dropdown for Requirement Clause */}
                <Select
                    width="17%"
                    height="30px"
                    bg={c.white}
                    value={pointRequirement}
                    cursor="pointer"
                    onChange={(e) => setPointRequirement(e.target.value)}
                >
                    <option value="EXACTLY">Exactly</option>
                    <option value="ATLEAST">At Least</option>
                    <option value="UPTO">Up to</option>
                </Select>

                {/* Number input for Points */}
                <NumberInput
                    step={5}
                    min={0}
                    height="40px"
                    width="13%"
                    bg={c.white}
                    ml={-3}
                    value={points}
                    onChange={(value) => setPoints(value)}
                >
                    <NumberInputField bg={c.white} />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>

                <Text textAlign="left" width="3%" fontSize="10px" color={c.darkBlue} ml={-3}>
                    FROM
                </Text>

                {/* Course Dropdown */}
                <Flex direction="row" width="55%" align="center">
                    <SingleSelect
                        onChange={(course) => setCourses([...courses, course])}
                        data={data
                            .filter((course) => !courses.includes(course))
                            .map((course) => ({ value: course, label: course.courseCode }))}
                        placeholder="Search"
                    />
                    <Flex
                        className="programmeRequirements"
                        minHeight="40px"
                        maxHeight="70px"
                        width="100%"
                        overflowX="scroll"
                        whiteSpace="nowrap"
                        padding="5px"
                        direction="row"
                        ml={2}
                        ref={scrollRef}
                    >
                        {courses.reverse().map((course) => (
                            <Flex>
                                <Tag size="sm" key={course._id} rounded="full" variant="solid" variantColor="cyan" mr={1}>
                                    <TagLabel>{course.courseCode}</TagLabel>
                                    <TagCloseButton onClick={() => handleRemoveCourse(course._id)} />
                                </Tag>
                            </Flex>
                        ))}
                    </Flex>

                    <Flex direction="row" justify="flex-end" align="flex-end" ml={2}>
                        <IconButton
                            as={AiOutlineCloseCircle}
                            size="xs"
                            color="red.400"
                            onClick={closeEdit}
                            cursor="pointer"
                            mr={1}
                            bg="none"
                        />
                        <IconButton
                            as={AiOutlineCheckCircle}
                            size="xs"
                            isDisabled={!(courses.length !== 0 && points > 0)}
                            color={c.green}
                            onClick={() => handleUpdateRegulation()}
                            cursor="pointer"
                            bg="none"
                        />
                    </Flex>
                </Flex>
            </Flex>
        </PseudoBox>
    );
};

export default InlineRegulations;
