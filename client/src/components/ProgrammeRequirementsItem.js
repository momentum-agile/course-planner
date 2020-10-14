import React from "react";
import { Flex, Text, Stack, PseudoBox, Tag, TagLabel, Box } from "@chakra-ui/core";
import { colors as c } from "../colors";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../pages/Plan/ItemTypes";
import { useHorizontalScroll } from "../pages/Programmes/scrollHook";

function DraggableCourseText({ index, courseName }) {
    const [, drag] = useDrag({
        item: { courseName, type: ItemTypes.COURSE_REQUIREMENT_PILL },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <Box ref={drag}>
            <Tag size="sm" key={index} rounded="full" variant="solid" variantColor="cyan" mr={1}>
                <TagLabel>{courseName}</TagLabel>
            </Tag>
        </Box>
    );
}
const ProgrammeRequirementsItem = ({ itemNumber, pointRequirement, points, courseList, onEdit, deleteButton, isDrag }) => {
    const pointRequirementMap = {
        EXACTLY: "Exactly",
        ATLEAST: "At least",
        UPTO: "Up to",
    };

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
            _hover={{
                bg: c.greyBlue,
                cursor: "pointer",
            }}
            onClick={onEdit}
        >
            <Flex justify="center" align="center" height="100%">
                <Text textAlign="right" width="5%" mr={3} as="b" color={c.iceBlue}>
                    {itemNumber}
                </Text>
                <Text textAlign="left" width={!isDrag ? "13%" : "20%"} align="flex-start" color={c.darkBlue}>
                    {pointRequirementMap[pointRequirement] || ""}
                </Text>
                <Text textAlign="left" width={!isDrag ? "13%" : "20%"} color={c.darkBlue}>
                    {`${points} pts`}
                </Text>
                <Text textAlign="left" width="8%" fontSize="10px" color={c.darkBlue}>
                    FROM
                </Text>
                <Stack
                    ref={scrollRef}
                    className="programmeRequirements"
                    textAlign="left"
                    isInline
                    overflowX="scroll"
                    width="70%"
                    ml={isDrag && 2}
                >
                    <Flex mb={courseList.length > 2 ? 1 : 0}>
                        {courseList.reverse().map((course, index) =>
                            isDrag ? (
                                <DraggableCourseText key={index} index={index} courseName={course} />
                            ) : (
                                <Tag size="sm" key={course._id} rounded="full" variant="solid" variantColor="cyan" mr={1}>
                                    <TagLabel>{course.courseCode}</TagLabel>
                                </Tag>
                            ),
                        )}
                    </Flex>
                </Stack>
                {!isDrag && <Flex width="7%">{deleteButton}</Flex>}
            </Flex>
        </PseudoBox>
    );
};

export default ProgrammeRequirementsItem;
