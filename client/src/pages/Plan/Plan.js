import React, { useState } from "react";
import { Divider, Flex, Icon, Text, Textarea, Tooltip } from "@chakra-ui/core";
import usePlan from "./usePlan";
import Header from "./Header";
import HomeIcon from "./HomeIcon";
import Year from "./Year";
import CoursePill from "./CoursePill";
import { SearchBar } from "../../components";
import filter from "@mcabreradev/filter";
import RequirementsList from "./RequirementsList";
import { colors as c } from "../../colors";

const reqsToolTip = "Requirements satisfied by the plan will be ticked off and become green";
const generateYears = (from, to) => (from && to && [...Array(to + 1).keys()].slice(from)) || [];

const Plan = () => {
    const {
        student,
        realCourses,
        programme,
        plan: { name, endYear, startYear, courseAllocations },
        unfilteredRealCourses,
        setCourseAllocations,
    } = usePlan();
    const [searchTerm, setSearchTerm] = useState("");
    const [note, setNote] = useState("");
    const years = generateYears(startYear, endYear);

    // TODO: The programme variable's requirements should have an attribute to check

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
                                filter(realCourses, { courseCode: searchTerm }).map(({ courseCode }, idx) => (
                                    <CoursePill key={idx} courseName={courseCode} />
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
                <Header name={student?.name} programme={programme?.name} planName={name} />
                <Divider orientation="horizontal" backgroundColor={c.iceBlue} width="100%" height="2px" />
                <Flex overflowY="scroll" direction="column">
                    {years.map((year) => (
                        <Year year={year} data={courseAllocations} updateData={setCourseAllocations} courses={unfilteredRealCourses} />
                    ))}
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Plan;
