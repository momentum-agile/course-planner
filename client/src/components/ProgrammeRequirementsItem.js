import React from "react";
import { Flex, Text, Stack, PseudoBox } from "@chakra-ui/core";
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
            width="90%"
            paddingLeft="3px"
            paddingRight="3px"
            bg={c.white}
            borderRadius="5px"
            flex-direction="row"
            alignItems="center"
            textAlign="center"
            justify="space-around"
            marginTop="10px"
            color={c.midnightBlue}
            _hover={{
                bg: c.whiteGrey,
                cursor: "pointer",
            }}
            onClick={onEdit}
        >
            <Flex justify="center" align="center">
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
                <Stack className="programmeRequirements" textAlign="left" isInline overflowX="scroll" width="50%">
                    {courseList.map((course, index) => (
                        <Text
                            key={index}
                            height="60%"
                            border="solid"
                            borderColor={c.lightBlue}
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
                {deleteButton}
            </Flex>
        </PseudoBox>
    );
};

export default ProgrammeRequirementsItem;
