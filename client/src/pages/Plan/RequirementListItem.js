import React from 'react';
import { Flex, Text, Stack, Icon } from "@chakra-ui/core";

// TODO: Refactor this to be common with Allen's component from the ProgrammeDegree page

const RequirementListItem = ({ index, prefix, points, courses, isSatisfied }) => {
    return (
        <Flex
            height="60px"
            paddingLeft="3px"
            paddingRight="3px"
            bg={isSatisfied ? "green.500" : "#303030"}
            borderRadius="5px"
            direction="row"
            alignItems="center"
            textAlign="center"
            justify="space-around"
            marginTop="5px"
            color="#ffffff"
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
                        {course}
                    </Text>
                ))}
            </Stack>
            <Flex>
                {isSatisfied
                    && <Icon name="check" />

                }
            </Flex>
        </Flex>
    );

};

export default RequirementListItem;