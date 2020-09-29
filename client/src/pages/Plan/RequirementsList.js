import React from "react";
import { Flex, Text } from "@chakra-ui/core";
import { colors as c } from "../../colors";
import { ProgrammeRequirementsItem } from "../../components";

const RequirementsList = ({ programme }) => {
    const regulations = programme.regulations;

    return (
        <Flex
            direction="column"
            width="100%"
            height="100%"
            background={programme && regulations.length > 0 ? c.white : "none"}
            marginTop="20px"
            maxHeight="200px"
            overflowY="auto"
            justify={regulations.length === 0 && "center"} // Justify only when empty to avoid the scrollbar from cutting off the list
        >
            {regulations.length > 0 ? (
                regulations.map((reg, i) => (
                    <ProgrammeRequirementsItem
                        itemNumber={i + 1}
                        pointRequirement={reg.pointRequirement}
                        points={reg.points}
                        courseList={reg.courses}
                        isDrag={true}
                    />
                ))
            ) : (
                <Text color={c.white} fontSize="xs" mt={-5} textAlign="center">
                    No Regulations have been set for this Programme yet.
                </Text>
            )}
        </Flex>
    );
};

export default RequirementsList;
