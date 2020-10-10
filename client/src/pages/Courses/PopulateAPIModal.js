import React, { useState, useEffect, useRef } from "react";
import {
    Button,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    Checkbox,
    CheckboxGroup,
    Flex,
    FormControl,
    Select,
    Text,
    useToast,
} from "@chakra-ui/core";
import { SearchBar } from "../../components";
import { CoursePlannerClient } from "../../common";
import filter from "@mcabreradev/filter";

const PopulateAPIModal = ({ isOpen, onClose, confirm, navigateTo }) => {
    const cancelRef = useRef();
    const [subject, setSubject] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState([]);
    const toast = useToast();

    useEffect(() => {
        if (subject.length === 0) return;
        CoursePlannerClient.getUniCoursesForDegree(subject)
            .then((res) => setData(res))
            .catch((err) => console.log(err));
    }, [subject]);

    const handleModalClose = () => {
        onClose();
        setSubject("");
        setSearchTerm("");
        setData([]);
    };

    const handleOnCheck = (key) => (courseCode) => {
        const newData = [...data];
        const courseIdx = newData.findIndex((course) => course.courseCode === courseCode);

        newData[courseIdx] = {
            ...data[courseIdx],
            [key]: !data[courseIdx][key],
        };

        // When course and overwrite are checked, when you uncheck the course, this will then also uncheck the overwrite
        if (key === "checked" && data[courseIdx]["overwrite"]) {
            newData[courseIdx] = {
                ...newData[courseIdx],
                overwrite: false,
            };
        }

        setData(newData);
    };

    const handleAll = (selected) => {
        const newData = data.map((course) => ({
            ...course,
            checked: selected,
            overwrite: course.inDatabase ? selected : false,
        }));

        setData(newData);
    };

    return (
        <>
            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={handleModalClose}>
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Populate Courses
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        <Text paddingBottom="10px" fontSize="xl">
                            Select degree to populate courses
                        </Text>
                        <FormControl>
                            <Select id="subject" placeholder="Select Subject" onChange={(e) => setSubject(e.target.value)}>
                                <option value="SOFTENG">SOFTENG</option>
                                <option value="COMPSCI">COMPSCI</option>
                                <option value="ENGGEN">ENGGEN</option>
                                <option value="ENGSCI">ENGSCI</option>
                                <option value="ELECTENG">ELECTENG</option>
                                <option value="COMPSYS">COMPSYS</option>
                                <option value="MECHENG">MECHENG</option>
                            </Select>
                        </FormControl>

                        {data.length > 0 && (
                            <Flex direction="column">
                                <SearchBar
                                    value={searchTerm}
                                    searchCategory="Populate"
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    width="100%"
                                />
                                <Flex direction="row" p={2} width="100%">
                                    <Flex width="70%" justify="flex-start">
                                        <Button size="xs" onClick={() => handleAll(true)}>
                                            Select All
                                        </Button>
                                        <Button size="xs" ml={2} onClick={() => handleAll(false)}>
                                            Deselect All
                                        </Button>
                                    </Flex>
                                    <Flex width="30%">
                                        <Text> Overwrite? </Text>
                                    </Flex>
                                </Flex>
                                <CheckboxGroup variantColor="blue" maxHeight="500px" overflowY="scroll" ml={2} mt={2}>
                                    {filter(data, { courseCode: searchTerm }).map(({ courseCode, inDatabase, checked, overwrite }, idx) => (
                                        <Flex direction="row" justifyContent="around" ml={4} key={idx}>
                                            <Flex width="50%">
                                                <Checkbox
                                                    key={idx}
                                                    value={courseCode}
                                                    isChecked={checked}
                                                    onChange={(e) => handleOnCheck("checked")(courseCode)}
                                                >
                                                    {courseCode}
                                                </Checkbox>
                                            </Flex>
                                            <Flex ml={16}>
                                                {inDatabase && (
                                                    <Checkbox
                                                        key={`${idx}-${inDatabase}`}
                                                        value={courseCode}
                                                        isChecked={overwrite}
                                                        isDisabled={!checked}
                                                        onChange={(e) => handleOnCheck("overwrite")(courseCode)}
                                                    />
                                                )}
                                            </Flex>
                                        </Flex>
                                    ))}
                                </CheckboxGroup>
                            </Flex>
                        )}
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={handleModalClose}>
                            Cancel
                        </Button>
                        <Button
                            isDisabled={subject === ""}
                            variantColor="blue"
                            onClick={() => {
                                confirm(subject, data, toast);
                                handleModalClose();
                            }}
                            ml={3}
                        >
                            Populate
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default PopulateAPIModal;
