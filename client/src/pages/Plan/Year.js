import React from "react";
import { Flex, Icon, Stack, Text } from "@chakra-ui/core";
import ReactTooltip from "react-tooltip";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import { colors as c } from "../../colors";
import { InlineEdit } from "../../components";

const CourseTile = ({ courseName, courses, updateData, data }) => {
    const [{ isDragging }, drag] = useDrag({
        item: { courseName, type: ItemTypes.COURSE_TILE },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const getCourseRegulations = () => {
        const foundCourses = courses.find((course) => {
            return course.courseCode === courseName;
        });
        if (!foundCourses) return "Course not in database.";
        const { prerequisites, corequisites, restrictions, informalEquivalents } = foundCourses;
        const tooltipString = [];
        prerequisites.length && tooltipString.push(`Prerequisites: ${prerequisites} <br />`);
        corequisites.length && tooltipString.push(`Corequisites: ${corequisites} <br />`);
        restrictions.length && tooltipString.push(`Restrictions: ${restrictions} <br />`);
        informalEquivalents.length && tooltipString.push(`Informal Equivalents: ${informalEquivalents} <br />`);
        !tooltipString.length && tooltipString.push("Course has no regulations");
        return tooltipString.join("");
    };

    const opacity = isDragging ? 0.4 : 1;

    return (
        <Flex
            p={2}
            justify="center"
            align="center"
            flexDirection="row"
            borderWidth="1px"
            width="90%"
            backgroundColor={c.darkGrey}
            borderRadius="5px"
            mt="2px"
        >
            <Flex ref={drag} cursor="pointer" style={{ opacity }} width="100%" direction="row" justify="center" align="center">
                <Flex>
                    <Text flex="1" textAlign="center" fontWeight="bold" fontSize="xl" color={c.white}>
                        {courseName}
                    </Text>
                </Flex>
            </Flex>
            <Flex>
                <Icon
                    mr={4}
                    name="small-close"
                    color={c.white}
                    cursor="pointer"
                    onClick={() => updateData(data.filter((data) => data.course !== courseName))}
                />
                <Icon name="info-outline" color={c.white} data-tip data-for={courseName} />
                <ReactTooltip id={courseName} place="right" multiline html>
                    {getCourseRegulations()}
                </ReactTooltip>
            </Flex>
        </Flex>
    );
};

const SemesterBox = ({ semester, data, year, updateData, courses }) => {
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: [ItemTypes.COURSE_PILL, ItemTypes.COURSE_TILE, ItemTypes.COURSE_REQUIREMENT_PILL],
        drop: ({ courseName }, monitor) => {
            const newData = data.filter((x) => x.course !== courseName);
            updateData([...newData, { course: courseName, year: year, semester: semester }]);
            return { name: "Dustbin" };
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const isActive = canDrop && isOver;
    let backgroundColor = "#E2E2E2";
    if (isActive) {
        backgroundColor = "#A9A9A9";
    } else if (canDrop) {
        backgroundColor = "#E2E2E2";
    }

    return (
        <Flex direction="column" width="50%" justify="center" align="center">
            <Flex width="100%" justify="center" align="center" marginTop="20px">
                <Text textAlign="center" fontWeight="bold" fontSize="xl" color={c.uoaBlue}>
                    {semester === "S1" ? "Semester 1" : "Semester 2"}
                </Text>
            </Flex>
            <Flex
                width="75%"
                justify="center"
                align="center"
                minHeight={"75px"}
                marginTop="5px"
                backgroundColor={c.lightGrey}
                paddingTop="2"
                paddingBottom="2"
                style={{ backgroundColor }}
                ref={drop}
            >
                <Stack className="courseContainer" spacing={8} width="100%" align="center" maxHeight="200px" overflowY="scroll">
                    {data
                        .filter((x) => x.semester === semester && x.year === year)
                        .map((course, idx) => (
                            <CourseTile updateData={updateData} data={data} key={idx} courseName={course.course} courses={courses} />
                        ))}
                </Stack>
            </Flex>
        </Flex>
    );
};

const Year = ({ year, data, startYear, updateData, courses, setStartYear }) => {
    return (
        <Flex direction="column" mt={4}>
            <Flex width="100%" justify="center" align="center" marginTop="20px">
                <InlineEdit
                    title="Year"
                    value={startYear + year}
                    onChange={(e) => new RegExp("^[0-9]+$").test(e) && setStartYear(e - year)}
                />
            </Flex>
            <Flex width="100%" direction="row" marginTop="5px">
                {["S1", "S2"].map((semester) => (
                    <SemesterBox semester={semester} year={year} data={data} updateData={updateData} courses={courses} />
                ))}
            </Flex>
        </Flex>
    );
};

export default Year;
