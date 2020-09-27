import React from "react";
import { Flex, Text, Stack, Icon } from "@chakra-ui/core";
import { colors as c } from "../../colors";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";

// TODO: Refactor this to be common with Allen's component from the ProgrammeDegree page

function CourseText({ index, courseName }) {
    const [, drag] = useDrag({
        item: { courseName, type: ItemTypes.COURSE_REQUIREMENT_PILL },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <Text
            key={index}
            height="60%"
            ref={drag}
            border="solid"
            borderColor={c.white}
            borderRadius="20px"
            borderWidth="1px"
            fontSize="12px"
            padding="3px"
            margin="2px"
        >
            {courseName}
        </Text>
    );
}

const RequirementListItem = ({ index, prefix, points, courses, isSatisfied }) => {
    return (
        <Flex
            height="60px"
            paddingLeft="3px"
            paddingRight="3px"
            bg={isSatisfied ? c.green : c.darkGrey}
            borderRadius="5px"
            direction="row"
            alignItems="center"
            textAlign="center"
            justify="space-around"
            marginTop="5px"
            color={c.white}
        >
            <Text textAlign="left" width="2%">
                {index + 1}.
            </Text>
            <Text textAlign="left" width="17%">
                {prefix}
            </Text>
            <Text textAlign="left" width="15%">
                {`${points} pts`}
            </Text>
            <Text textAlign="left" width="10%" fontSize="10px">
                FROM
            </Text>
            <Stack className="programmeRequirements" textAlign="left" isInline overflowX="scroll" width="35%">
                {courses.map((course, index) => (
                    <CourseText index={index} key={index} courseName={course} />
                ))}
            </Stack>
            <Flex>{isSatisfied && <Icon name="check" />}</Flex>
        </Flex>
    );
};

export default RequirementListItem;
