import React from "react";
import { Flex, Text, Stack, PseudoBox, Tag, TagLabel } from "@chakra-ui/core";
import { colors as c } from "../colors";

const ProgrammeRequirementsItem = ({ itemNumber, pointRequirement, points, courseList, onDelete, onEdit, deleteButton }) => {
    const pointRequirementMap = {
        EXACTLY: "Exactly",
        ATLEAST: "At least",
        UPTO: "Up to",
    };

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
            <Flex justify="center" align="center">
                <Text textAlign="right" width="5%" mr={3} as="b" color={c.iceBlue}>
                    {itemNumber}
                </Text>
                <Text textAlign="left" width="13%" align="flex-start" color={c.darkBlue}>
                    {pointRequirementMap[pointRequirement] || ""}
                </Text>
                <Text textAlign="left" width="13%" color={c.darkBlue}>
                    {`${points} pts`}
                </Text>
                <Text textAlign="left" width="8%" fontSize="10px" color={c.darkBlue}>
                    FROM
                </Text>
                <Stack className="programmeRequirements" textAlign="left" isInline overflowX="scroll" width="70%">
                    <Flex mb={courseList.length > 2 ? 1 : 0}>
                        {courseList.reverse().map((course, index) => (
                            <Tag size="sm" key={course._id} rounded="full" variant="solid" variantColor="cyan" mr={1}>
                                <TagLabel>{course.courseCode}</TagLabel>
                            </Tag>
                        ))}
                    </Flex>
                </Stack>
                {/* Buttons to be refactored  */}
                <Flex width="7%">{deleteButton}</Flex>
            </Flex>
        </PseudoBox>
    );
};

export default ProgrammeRequirementsItem;
