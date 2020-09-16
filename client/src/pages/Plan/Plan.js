import React, { useState } from "react";
import { Flex, Text, Divider, Box, Textarea } from "@chakra-ui/core";
import usePlan from "./usePlan";
import Header from "./Header";
import HomeIcon from "./HomeIcon";
import Year from "./Year";
import { SearchBar } from "../../components";
import filter from "@mcabreradev/filter";

const CoursePill = ({ courseName }) => {
    return (
        <Box flex="1 1 25%" height="100%" background="gray" borderRadius="10px" borderRight="solid white" maxWidth="25%" marginTop="10px">
            <Text textAlign="center" color="white">
                {courseName}
            </Text>
        </Box>
    );
};

const Plan = () => {
    const { student, realCourses } = usePlan();
    const [searchTerm, setSearchTerm] = useState("");
    const [note, setNote] = useState("");

    return (
        <Flex height="100vh" width="100%" direction="row" backgroundColor="#F0F0F0">
            <Flex height="100%" width="30%" direction="column" backgroundColor="#303030">
                <Flex direction="row" justify="center" align="center">
                    <HomeIcon />
                    <Flex width="80%" justify="center">
                        <Text textAlign="center" fontSize="5xl" color="white">
                            Requirements
                        </Text>
                    </Flex>
                </Flex>

                <Flex direction="column" width="100%">
                    <Text textAlign="center" fontSize="5xl" color="white">
                        Courses
                    </Text>
                    <SearchBar searchCategory="Courses" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <Flex align="center" justify="center">
                        <Flex
                            width="80%"
                            flexWrap="wrap"
                            padding="0 0 10px 10px"
                            background="white"
                            marginTop="20px"
                            maxHeight="200px"
                            overflowY="scroll"
                        >
                            {realCourses &&
                                filter(realCourses, { courseCode: searchTerm }).map(({ courseCode }) => (
                                    <CoursePill courseName={courseCode} />
                                ))}
                        </Flex>
                    </Flex>
                    <Text textAlign="center" fontSize="5xl" color="white">
                        Notes
                    </Text>
                    <Flex align="center" justify="center">
                        <Flex width="80%" background="white">
                            <Textarea
                                placeholder="Add your note here"
                                size="sm"
                                height="200px"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <Flex height="100%" width="70%" direction="column">
                <Header name={student?.name} />
                <Divider orientation="horizontal" backgroundColor="#A7C4E0" width="100%" height="2px" />
                <Flex overflowY="scroll" direction="column">
                    <Year year={2020} />
                    <Year year={2021} />
                    <Year year={2022} />
                    <Year year={2023} />
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Plan;
