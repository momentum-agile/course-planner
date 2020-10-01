import React, { useEffect, useState } from "react";
import { Flex, Icon, IconButton, Input, Stack, Tag, TagLabel, Text } from "@chakra-ui/core";
import ReactTooltip from "react-tooltip";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import { colors as c } from "../../colors";
import { OptionsMenu } from "../../components";
import usePlan from "./usePlan";

const CourseTile = ({ courseName, courses, updateData, data }) => {
    const [isHovered, setIsHovered] = useState(false);
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
            backgroundColor={c.midnightBlue}
            borderRadius="5px"
            mt="2px"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered ? (
                <Flex width="5%">
                    <Icon name="info-outline" color={c.white} data-tip data-for={courseName} />
                    <ReactTooltip id={courseName} place="left" multiline html>
                        {getCourseRegulations()}
                    </ReactTooltip>
                </Flex>
            ) : (
                <Flex width="5%" />
            )}
            <Flex ref={drag} cursor="pointer" style={{ opacity }} width="100%" direction="row" justify="center" align="center">
                <Flex>
                    <Text flex="1" textAlign="center" fontWeight="bold" fontSize="xl" color={c.greyBlue}>
                        {!isNaN(courseName) ? "Placeholder" : courseName}
                    </Text>
                </Flex>
            </Flex>
            <Flex width="5%">
                {isHovered ? (
                    <Flex width="5%">
                        <Icon
                            mr={4}
                            name="small-close"
                            color={c.white}
                            cursor="pointer"
                            onClick={() => updateData(data.filter((data) => data.course !== courseName))}
                        />
                    </Flex>
                ) : (
                    <Flex width="5%" />
                )}
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
    let backgroundColor = c.greyBlue;
    if (isActive) {
        backgroundColor = c.iceBlue;
    } else if (canDrop) {
        backgroundColor = c.greyBlue;
    }

    return (
        <Flex direction="column" width="50%" justify="center" align="center" mb={5}>
            <Flex width="100%" justify="center" align="center">
                <Text textAlign="center" fontWeight="bold" fontSize="xl" color={c.nightBlue}>
                    {semester === "S1" ? "Semester 1" : "Semester 2"}
                </Text>
            </Flex>
            <Flex
                id={`${year}${semester}`}
                width="75%"
                height="100%"
                justify="center"
                minHeight="200px"
                marginTop="5px"
                backgroundColor={backgroundColor}
                paddingTop="2"
                paddingBottom="2"
                ref={drop}
            >
                <Stack className="courseContainer" spacing={8} width="100%" align="center" justify="flex-start">
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
    const [isEditingYear, setIsEditingYear] = useState(false);
    const [editStartYear, setEditStartYear] = useState(startYear);
    const { student } = usePlan();

    const saveYearName = () => {
        setStartYear(editStartYear);
        setIsEditingYear(false);
    };

    const cancelYearName = () => {
        setIsEditingYear(false);
        setEditStartYear(startYear);
    };

    useEffect(() => {
        setEditStartYear(startYear);
    }, [startYear]);
    return (
        <Flex direction="column" bg={c.white} p={5} mt={10} shadow="md" rounded="sm" width="95%" align="center" justify="center" zIndex="2">
            <Flex direction="row" width="100%">
                <Flex justify="center" width="100%">
                    {isEditingYear ? (
                        <Flex width="100%" direction="row" justify="center" align="center" mb={1}>
                            <Input
                                variant="flushed"
                                placeholder="Year Name"
                                textAlign="center"
                                width="70%"
                                size="lg"
                                value={editStartYear + year}
                                onChange={(e) => new RegExp("^[0-9]{0,4}$").test(e.target.value) && setEditStartYear(e.target.value - year)}
                                mb={2}
                            />
                            <Flex direction="column" ml={5}>
                                <IconButton icon="check" size="xs" mb={1} onClick={saveYearName} zIndex="2" />
                                <IconButton icon="close" size="xs" onClick={cancelYearName} zIndex="2" />
                            </Flex>
                        </Flex>
                    ) : (
                        <Tag size="lg" rounded="full" variant="solid" variantColor="cyan" mr={1}>
                            <TagLabel>{editStartYear + year}</TagLabel>
                        </Tag>
                    )}
                </Flex>
                <Flex justify="flex-end" width="0%">
                    {student && <OptionsMenu onEdit={() => setIsEditingYear(true)} />}
                </Flex>
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
