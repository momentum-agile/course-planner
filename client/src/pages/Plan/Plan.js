import React, { useState } from "react";
import { Flex, IconButton, Icon, Text, Textarea, Tooltip, useToast } from "@chakra-ui/core";
import usePlan from "./usePlan";
import Header from "./Header";
import Year from "./Year";
import CoursePill from "./CoursePill";
import { ExportMenu, MenuWrapper, SearchBar } from "../../components";
import filter from "@mcabreradev/filter";
import RequirementsList from "./RequirementsList";
import { colors as c } from "../../colors";
import { useHotkeys } from "react-hotkeys-hook";
import { useHistory } from "react-router-dom";
import json2md from "json2md";
import { parsePlanWithStudent } from "./JsonCustomConverter";
import fileDownload from "js-file-download";

const reqsToolTip = "To complete the chosen programme, this plan should satisfy all of these regulations.";
const generateYears = (to) => (to && [...Array(to).keys()]) || [];

const PlanOptions = ({ plan, detail, setOpenConfirmationDialog, openConfirmationDialog, onDelete, onEditName, onExport, onClear }) => {
    return (
        <MenuWrapper
            item={plan}
            detail={detail}
            itemType="Plan"
            setOpenConfirmationDialog={setOpenConfirmationDialog}
            openConfirmationDialog={openConfirmationDialog}
            onClear={onClear}
            confirm={onDelete}
            onEdit={onEditName}
            onExport={onExport}
        />
    );
};

const Plan = () => {
    const {
        student,
        courses,
        programme,
        setCourseAllocations,
        setName,
        setNumYears,
        setStartYear,
        savePlan,
        plan,
        deletePlan,
        lastSaveDate,
    } = usePlan();

    const { name, numYears, startYear, courseAllocations } = plan;
    const [searchTerm, setSearchTerm] = useState("");
    const [note, setNote] = useState("");
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    const [isPlanNameEdited, setIsPlanNameEdited] = useState(false);
    const toast = useToast();
    const history = useHistory();
    useHotkeys("cmd+s, ctrl+s", (e) => {
        e.preventDefault();
        toast({
            title: `Plan already saved 😎`,
            description: `Course-planner auto-saves your work, so you don't have to.`,
            status: "success",
            duration: 2000,
            isClosable: true,
        });
    });

    const exportToMarkdown = () => {
        const customPlan = parsePlanWithStudent(plan, student, programme, startYear);
        fileDownload(json2md(customPlan), `${student.name}-${plan.name}.md`);
    };

    const exportToJSON = async () => {
        fileDownload(JSON.stringify(plan), `${student.name}-${plan.name}.json`);
    };

    const filteredCourses = () => {
        const unique = [...new Set(courseAllocations?.map((item) => item.course))];
        return courses.filter((val) => !unique.includes(val.courseCode) || val.isPlaceholder);
    };
    const years = () => generateYears(numYears);

    // TODO: The programme variable's requirements should have an attribute to check

    return (
        <Flex height="100vh" width="100%" direction="row" backgroundColor={c.white}>
            {/* LHS of Plans Page */}
            <Flex height="100%" width="30%" direction="column" backgroundColor={c.midnightBlue} align="center">
                <IconButton
                    icon="arrow-back"
                    onClick={() => history.goBack()}
                    size="md"
                    position="fixed"
                    left={3}
                    top={1}
                    cursor="pointer"
                    color={c.white}
                    bg={c.midnightBlue}
                    _hover={{
                        bg: c.nightBlue,
                    }}
                    _active={{
                        bg: c.iceBlue,
                    }}
                />
                <Flex
                    direction="column"
                    bg={c.nightBlue}
                    p={5}
                    mt={50}
                    shadow="md"
                    rounded="md"
                    width="90%"
                    height="100%"
                    align="center"
                    justify="center"
                >
                    <Flex direction="row" align="center">
                        <Text width="90%" textAlign="center" fontWeight="bold" color={c.whiteGrey} fontSize="xl">
                            Regulations
                        </Text>
                        <Tooltip label={reqsToolTip} placement="bottom" bg={c.greyBlue} color={c.darkBlue}>
                            <Icon name="question-outline" color={c.white} marginLeft="5px" align="center" justify="center" />
                        </Tooltip>
                    </Flex>
                    <Flex align="center" jusatify="center" width="100%" height="100%">
                        <RequirementsList programme={programme} />
                    </Flex>
                </Flex>

                <Flex
                    direction="column"
                    bg={c.nightBlue}
                    p={5}
                    mt={5}
                    mb={student ? 0 : 5}
                    shadow="md"
                    rounded="md"
                    width="90%"
                    align="center"
                    justify="center"
                    height="100%"
                >
                    <Flex direction="row" align="center">
                        <Text width="90%" textAlign="center" fontWeight="bold" color={c.whiteGrey} fontSize="xl">
                            Courses
                        </Text>
                    </Flex>
                    <SearchBar searchCategory="Courses" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <Flex align="center" justify="center" width="100%" height="100%">
                        <Flex
                            height="100%"
                            width="90%"
                            whiteSpace="nowrap"
                            flexWrap="wrap"
                            padding="0 0 10px 10px"
                            background={c.white}
                            marginTop="20px"
                            maxHeight={!student ? "500px" : "200px"}
                            overflowY="scroll"
                            justify="flex-start"
                            align="flex-start"
                        >
                            {filteredCourses() && filter(filteredCourses(), { courseCode: searchTerm }).length !== 0 ? (
                                filter(filteredCourses(), { courseCode: searchTerm }).map(({ courseCode, isPlaceholder }, idx) => (
                                    <CoursePill key={idx} courseName={courseCode} isPlaceholder={isPlaceholder} />
                                ))
                            ) : (
                                <Text color={c.grey} fontSize="md" justifySelf="center" alignSelf="center">
                                    No courses found.
                                </Text>
                            )}
                        </Flex>
                    </Flex>
                </Flex>

                {student && (
                    <Flex
                        direction="column"
                        bg={c.nightBlue}
                        p={5}
                        mt={5}
                        mb={5}
                        shadow="md"
                        rounded="md"
                        width="90%"
                        align="center"
                        justify="center"
                        height="100%"
                    >
                        <Flex direction="row" align="center">
                            <Text width="90%" textAlign="center" fontWeight="bold" color={c.whiteGrey} fontSize="xl">
                                Notes
                            </Text>
                        </Flex>
                        <Flex align="center" justify="center" width="100%" height="100%">
                            <Textarea
                                placeholder="Add a note to this plan."
                                size="sm"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                resize="none"
                            />
                        </Flex>
                    </Flex>
                )}
            </Flex>

            {/* RHS of Plans Page */}
            <Flex height="100%" width="70%" direction="column">
                <Header
                    name={student?.name}
                    programme={programme?.name}
                    lastSaveDate={lastSaveDate}
                    planName={name}
                    setPlanName={setName}
                    isEdited={isPlanNameEdited}
                    setIsEdited={setIsPlanNameEdited}
                    exportMenu={
                        student && <ExportMenu onExportMarkdown={() => exportToMarkdown(plan)} onExportJson={() => exportToJSON(plan)} />
                    }
                    optionsMenu={
                        <PlanOptions
                            plan={plan}
                            detail={name}
                            onClear={() => setCourseAllocations([])}
                            setOpenConfirmationDialog={setOpenConfirmationDialog}
                            openConfirmationDialog={openConfirmationDialog}
                            onExport={() => console.log("Export")}
                            onDelete={() => deletePlan(student, programme)}
                            onEditName={student ? () => setIsPlanNameEdited(true) : false}
                        />
                    }
                />
                <Flex overflowY="scroll" direction="column" bg={c.lightMidnightBlue} height="100%" width="100%" align="center">
                    <Flex justify="space-around" width="10%" align="center" mt={10}>
                        <IconButton
                            icon="minus"
                            onClick={() =>
                                savePlan(
                                    courseAllocations.map((courseAllocation) => ({
                                        // forEach iterates through an array
                                        ...courseAllocation,
                                        year: courseAllocation.year - 1,
                                    })),
                                    name,
                                    numYears - 1,
                                    startYear + 1,
                                )
                            }
                            isDisabled={!numYears || courseAllocations.filter((courseAllocation) => courseAllocation.year === 0).length}
                        />
                        <IconButton
                            icon="add"
                            onClick={() =>
                                savePlan(
                                    courseAllocations.map((courseAllocation) => ({
                                        // forEach iterates through an array
                                        ...courseAllocation,
                                        year: courseAllocation.year + 1,
                                    })),
                                    name,
                                    numYears + 1,
                                    startYear - 1,
                                )
                            }
                        />
                    </Flex>
                    <Flex direction="column" width="100%" align="center">
                        {years().map((year, idx) => (
                            <Year
                                year={year}
                                key={idx}
                                setStartYear={setStartYear}
                                startYear={startYear}
                                data={courseAllocations}
                                updateData={setCourseAllocations}
                                courses={courses}
                            />
                        ))}
                    </Flex>

                    <Flex justify="space-around" width="10%" align="center" mt={10} mb={5}>
                        <IconButton
                            icon="minus"
                            onClick={() => setNumYears(numYears - 1)}
                            isDisabled={
                                !numYears || courseAllocations.filter((courseAllocation) => courseAllocation.year === numYears - 1).length
                            }
                        />
                        <IconButton icon="add" onClick={() => setNumYears(numYears + 1)} />
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Plan;
