import React from "react";
import { Flex, Text, Stack } from "@chakra-ui/core";
import { colors as c } from "../../colors";

const CourseTile = ({ courseName }) => {
    return (
        <Flex p={2} justify="center" align="center" borderWidth="1px" width="90%" backgroundColor={c.darkGrey} borderRadius="5px" mt="2px">
            <Text textAlign="center" fontWeight="bold" fontSize="xl" color={c.white}>
                {courseName}
            </Text>
        </Flex>
    );
};

const SemesterBox = ({ semester }) => {
    return (
        <Flex direction="column" width="50%" justify="center" align="center">
            <Flex width="100%" justify="center" align="center" marginTop="20px">
                <Text textAlign="center" fontWeight="bold" fontSize="xl" color={c.uoaBlue}>
                    {semester}
                </Text>
            </Flex>
            <Flex
                width="75%"
                justify="center"
                align="center"
                marginTop="5px"
                backgroundColor={c.lightGrey}
                paddingTop="2"
                paddingBottom="2"
            >
                <Stack className="courseContainer" spacing={8} width="100%" align="center" maxHeight="200px" overflowY="scroll">
                    <CourseTile courseName="COMPSYS201" />
                    <CourseTile courseName="ENGSCI213" />
                    <CourseTile courseName="SOFTENG250" />
                    <CourseTile courseName="SOFTENG251" />
                </Stack>
            </Flex>
        </Flex>
    );
};

const Year = ({ year }) => {
    return (
        <Flex direction="column" mt={4}>
            <Flex width="100%" justify="center" align="center" marginTop="20px">
                <Text textAlign="center" fontWeight="bold" fontSize="3xl" color={c.darkGrey}>
                    {year}
                </Text>
            </Flex>
            <Flex width="100%" direction="row" marginTop="5px">
                <SemesterBox semester={"Semester One"} />
                <SemesterBox semester={"Semester Two"} />
            </Flex>
        </Flex>
    );
};

export default Year;
