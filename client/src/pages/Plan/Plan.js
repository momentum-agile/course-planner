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
import Button from "@chakra-ui/core/dist/Button";

const reqsToolTip = "Requirements satisfied by the plan will be ticked off and become green";
const generateYears = (to) => (to && [...Array(to).keys()]) || [];

const PlanButton = ({ text, onClick, isDisabled, bottomRight }) => {
    return (
        <Button
            backgroundColor={c.whiteGrey}
            border={`2px solid ${c.uoaBlue}`}
            rounded="35px"
            width={!bottomRight && "250px"}
            position={bottomRight && "absolute"}
            right={bottomRight && 10}
            bottom={bottomRight && 8}
            height={"45px"}
            margin="10px"
            onClick={onClick}
            isDisabled={isDisabled}
        >
            <Text textAlign="center" fontSize="xl" color={c.uoaBlue}>
                {text}
            </Text>
        </Button>
    );
};

const Plan = () => {
    const {
        student,
        realCourses,
        programme,
        name,
        numYears,
        startYear,
        courseAllocations,
        setCourseAllocations,
        setName,
        setNumYears,
        setStartYear,
        savePlan,
    } = usePlan();
    const [searchTerm, setSearchTerm] = useState("");
    const [note, setNote] = useState("");

    const filteredCourses = () => {
        const unique = [...new Set(courseAllocations?.map((item) => item.course))];
        return realCourses.filter((val) => !unique.includes(val.courseCode));
    };
    const years = () => generateYears(numYears);

    // TODO: The programme variable's requirements should have an attribute to check

    return (
        <Flex height="100vh" width="100%" direction="row" backgroundColor={c.whiteGrey}>
            <Flex height="100%" width="30%" direction="column" backgroundColor={c.darkGrey}>
                <HomeIcon />

                {student && (
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
                )}

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
                            maxHeight={!student ? "600px" : "200px"}
                            overflowY="scroll"
                        >
                            {filteredCourses() &&
                                filter(filteredCourses(), { courseCode: searchTerm }).map(({ courseCode }, idx) => (
                                    <CoursePill key={idx} courseName={courseCode} />
                                ))}
                        </Flex>
                    </Flex>

                    {student && (
                        <>
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
                        </>
                    )}
                </Flex>
            </Flex>

            <Flex height="100%" width="70%" direction="column">
                <Header name={student?.name} programme={programme?.name} planName={name} setPlanName={setName} />
                <Divider orientation="horizontal" backgroundColor={c.iceBlue} width="100%" height="2px" />
                <Flex overflowY="scroll" direction="column">
                    <Flex justify="center" width="100%">
                        <PlanButton
                            text="Remove Previous Year"
                            onClick={() => {
                                setCourseAllocations(
                                    courseAllocations.map((courseAllocation) => ({
                                        // forEach iterates through an array
                                        ...courseAllocation,
                                        year: courseAllocation.year - 1,
                                    })),
                                );
                                setNumYears(numYears - 1);
                                setStartYear(startYear + 1);
                            }}
                            isDisabled={!numYears || courseAllocations.filter((courseAllocation) => courseAllocation.year === 0).length}
                            height="60px"
                        />
                        <PlanButton
                            text="Add Previous Year"
                            onClick={() => {
                                setCourseAllocations(
                                    courseAllocations.map((courseAllocation) => ({
                                        // forEach iterates through an array
                                        ...courseAllocation,
                                        year: courseAllocation.year + 1,
                                    })),
                                );
                                setNumYears(numYears + 1);
                                setStartYear(startYear - 1);
                            }}
                            height="60px"
                        />
                    </Flex>
                    {years().map((year, idx) => (
                        <Year
                            year={year}
                            key={idx}
                            setStartYear={setStartYear}
                            startYear={startYear}
                            data={courseAllocations}
                            updateData={setCourseAllocations}
                            courses={realCourses}
                        />
                    ))}

                    <Flex justify="center" width="100%">
                        <PlanButton
                            text="Remove Year"
                            onClick={() => setNumYears(numYears - 1)}
                            isDisabled={
                                !numYears || courseAllocations.filter((courseAllocation) => courseAllocation.year === numYears - 1).length
                            }
                            height="60px"
                        />
                        <PlanButton text="Add Year" onClick={() => setNumYears(numYears + 1)} height="60px" />
                    </Flex>
                    <Flex justify="center" width="100%">
                        <PlanButton text="Save" onClick={savePlan} bottomRight />
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Plan;
