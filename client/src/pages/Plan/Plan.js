import React, { useState } from "react";
import { Flex, Text, Divider, Box, Textarea, Icon, Tooltip } from "@chakra-ui/core";
import usePlan from "./usePlan";
import Header from "./Header";
import HomeIcon from "./HomeIcon";
import Year from "./Year";
import { SearchBar } from "../../components";
import filter from "@mcabreradev/filter";
import RequirementsList from "./RequirementsList";
import { colors as c } from "../../colors";

const reqsToolTip = "Requirements satisfied by the plan will be ticked off and become green";

const CoursePill = ({ courseName }) => {
    return (
        <Box flex="1 1 25%" height="100%" background="gray" borderRadius="10px" borderRight="solid white" maxWidth="25%" marginTop="10px">
            <Text textAlign="center" color={c.white}>
                {courseName}
            </Text>
        </Box>
    );
};

const Plan = () => {
    const { student, realCourses, programme } = usePlan();
    const [searchTerm, setSearchTerm] = useState("");
    const [note, setNote] = useState("");

    // TODO: The programme variable's requirements should have an attribute to check
    // whether it's been satisfied by the plan/timetable (show which ones have been satisfied, e.g. tick off)

    return (
        <Flex height="100vh" width="100%" direction="row" backgroundColor={c.whiteGrey}>
            <Flex height="100%" width="30%" direction="column" backgroundColor={c.darkGrey}>
                <HomeIcon />

                <Flex direction="column" justify="center" align="center">
                    <Flex direction="row" align="center">
                        <Text textAlign="center" fontSize="5xl" color={c.white}>
                            Requirements
                        </Text>
                        <Tooltip label={reqsToolTip} placement="bottom" bg={c.uoaBlue}>
                            <Icon name="question" color={c.white} marginLeft="5px" />
                        </Tooltip>
                    </Flex>

                    <Flex align="center" justify="center" width="100%">
                        <RequirementsList programme={programme} />
                    </Flex>
                </Flex>

                <Flex direction="column" width="100%">
                    <Text textAlign="center" fontSize="5xl" color={c.white}>
                        Courses
                    </Text>
                    <SearchBar searchCategory="Courses" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <Flex align="center" justify="center">
                        <Flex
                            width="80%"
                            flexWrap="wrap"
                            padding="0 0 10px 10px"
                            background={c.white}
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

                    <Text textAlign="center" fontSize="5xl" color={c.white}>
                        Notes
                    </Text>
                    <Flex align="center" justify="center">
                        <Flex width="80%" background={c.white}>
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
                <Divider orientation="horizontal" backgroundColor={c.iceBlue} width="100%" height="2px" />
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
