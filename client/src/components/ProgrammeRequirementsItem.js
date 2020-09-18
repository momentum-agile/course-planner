import React from "react";
import { Flex, Box, Text, Stack } from "@chakra-ui/core";
import { AiOutlineEdit } from "react-icons/ai";

const ProgrammeRequirementsItem = ({ itemNumber, pointRequirement, points, courseList, onDelete, onEdit, deleteButton }) => {
    const pointRequirementMap = {
        EXACTLY: "Exactly",
        ATLEAST: "At least",
        UPTO: "Up to",
    };

    return (
        <Flex
            height="60px"
            width="90%"
            paddingLeft="3px"
            paddingRight="3px"
            bg="#303030"
            borderRadius="5px"
            direction="row"
            alignItems="center"
            textAlign="center"
            justify="space-around"
            marginTop="10px"
            color="#ffffff"
        >
            <Text textAlign="left" width="5%">
                {itemNumber}
            </Text>
            <Text textAlign="left" width="15%">
                {pointRequirementMap[pointRequirement] || ""}
            </Text>
            <Text textAlign="left" width="15%">
                {`${points} pts`}
            </Text>
            <Text textAlign="left" width="10%" fontSize="10px">
                FROM
            </Text>
            <Stack className="programmeRequirements" textAlign="left" isInline overflowX="scroll" width="35%">
                {courseList.map((course, index) => (
                    <Text
                        key={index}
                        height="60%"
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
                ))}
            </Stack>
            {/* Buttons to be refactored  */}
            <Box textAlign="left" as={AiOutlineEdit} size="32px" color="green.400" width="10%" cursor="pointer" onClick={onEdit} />
            {deleteButton}
        </Flex>
    );
};

export default ProgrammeRequirementsItem;
