import React from "react";
import { Flex, Stack, Text } from "@chakra-ui/core";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import { colors as c } from "../../colors";

const CourseTile = ({ courseName }) => {
    const [{ isDragging }, drag] = useDrag({
        item: { courseName, type: ItemTypes.COURSE_TILE },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.4 : 1;

    return (
        <Flex
            p={2}
            justify="center"
            style={{ opacity }}
            align="center"
            borderWidth="1px"
            width="90%"
            backgroundColor={c.darkGrey}
            borderRadius="5px"
            mt="2px"
            ref={drag}
            cursor="pointer"
        >
            <Text textAlign="center" fontWeight="bold" fontSize="xl" color={c.white}>
                {courseName}
            </Text>
        </Flex>
    );
};

const SemesterBox = ({ semester, data, year, updateData }) => {
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
                            <CourseTile key={idx} courseName={course.course} />
                        ))}
                </Stack>
            </Flex>
        </Flex>
    );
};

const Year = ({ year, data, updateData }) => {
    return (
        <Flex direction="column" mt={4}>
            <Flex width="100%" justify="center" align="center" marginTop="20px">
                <Text textAlign="center" fontWeight="bold" fontSize="3xl" color={c.darkGrey}>
                    {year}
                </Text>
            </Flex>
            <Flex width="100%" direction="row" marginTop="5px">
                {["S1", "S2"].map((semester) => (
                    <SemesterBox semester={semester} year={year} data={data} updateData={updateData} />
                ))}
            </Flex>
        </Flex>
    );
};

export default Year;
