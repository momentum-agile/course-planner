import React from "react";
import { Flex, Text, Stack } from "@chakra-ui/core";

const CourseTile = ({ courseName }) => {
    return (
        <Flex p={2} justify="center" align="center" borderWidth="1px" width="90%" backgroundColor="#3D3D3D" borderRadius="5px" mt="2px">
            <Text textAlign="center" fontWeight="bold" fontSize="xl" color="white">
                {courseName}
            </Text>
        </Flex>
    );
};

const SemesterBox = ({ semester }) => {
    return (
        <Flex direction="column" width="50%" justify="center" align="center">
            <Flex width="100%" justify="center" align="center" marginTop="20px">
                <Text textAlign="center" fontWeight="bold" fontSize="xl" color="#1F487A">
                    {semester}
                </Text>
            </Flex>
            <Flex width="75%" justify="center" align="center" marginTop="5px" backgroundColor="#E2E2E2" paddingTop="2" paddingBottom="2">
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
                <Text textAlign="center" fontWeight="bold" fontSize="3xl" color="#464646">
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
