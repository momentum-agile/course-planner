import React, { useEffect, useState } from "react";
import { Flex, Heading, Button, useToast } from "@chakra-ui/core";
import { Table, SearchBar, NavigationMenu } from "../../components";
import useCourses from "./useCourses";
import { colors as c } from "../../colors";
import PopulateAPIModal from "./PopulateAPIModal";
import CourseView from "./CourseView";

const Courses = () => {
    const toast = useToast();

    const [currRow, setCurrRow] = useState("0");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCourse, setSelectedCourse] = useState({});
    const [isAddingCourse, setIsAddingCourse] = useState(false);
    const [populateFromUniAPI, setPopulateFromUniAPI] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const { data, columns, createCourse, updateCourse, deleteCourse, createCoursesFromUniApi, prefillCourse } = useCourses();

    useEffect(() => {
        setSelectedCourse(isAddingCourse ? {} : data[currRow] || {});
        setIsEditing(false);
    }, [data, currRow, isAddingCourse]);

    const cancelCourse = () => {
        setIsEditing(false);
        setSelectedCourse(selectedCourse === {} ? data[parseInt(currRow)] : { ...selectedCourse });
        setIsAddingCourse(false);
    };

    const saveCourse = (toSave) => {
        if (isAddingCourse) {
            // Don't allow creating a course when the courseCode already exists
            if (data.find((d) => d.courseCode === toSave.courseCode)) {
                toast({
                    isClosable: true,
                    duration: 9000,
                    title: "Could Not Create Course",
                    description: `Course with code '${toSave.courseCode}' already exists`,
                    status: "error",
                });
                return;
            }

            createCourse(toSave);
            setIsAddingCourse(false);
            setCurrRow(data.length.toString());
            setSelectedCourse(toSave);
            toast({
                isClosable: true,
                duration: 9000,
                title: "Course Created",
                description: `Course '${toSave.courseCode}' has been successfully created`,
                status: "success",
            });
        } else {
            updateCourse(toSave);
        }
        setSearchTerm("");
    };

    return (
        <Flex direction="row" bg={c.midnightBlue}>
            {/* Left side of page */}
            <Flex width="50%" direction="column">
                <Flex left="1px" justify="flex-start">
                    <NavigationMenu />
                </Flex>

                <Flex align="center" justify="center">
                    <Heading textAlign="center" color={c.white} fontWeight="bold">
                        Courses
                    </Heading>
                </Flex>

                <Flex justify="flex-end" direction="row" p={2} mr="4%">
                    <Button
                        color={c.white}
                        bg={c.midnightBlue}
                        border="1px"
                        borderColor={c.white}
                        _hover={{ bg: c.lightBlue, borderColor: c.lightBlue }}
                        onClick={() => {
                            setSelectedCourse({});
                            setIsAddingCourse(true);
                        }}
                        mr="10px"
                    >
                        + Create
                    </Button>

                    <Button
                        color={c.white}
                        bg={c.midnightBlue}
                        border="1px"
                        borderColor={c.white}
                        _hover={{ bg: c.lightBlue, borderColor: c.lightBlue }}
                        onClick={() => {
                            setPopulateFromUniAPI(true);
                        }}
                    >
                        + Populate From Uni API
                    </Button>

                    <PopulateAPIModal
                        isOpen={populateFromUniAPI}
                        onClose={() => setPopulateFromUniAPI(false)}
                        confirm={(subject, data, toast) => {
                            createCoursesFromUniApi(subject, data, toast);
                            setSearchTerm("");
                        }}
                    />
                </Flex>

                <SearchBar searchCategory="Courses" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

                <Flex p={4}>
                    <Table
                        columns={columns}
                        data={data}
                        getRowProps={(row) => ({
                            onClick: () => {
                                setIsAddingCourse(false);
                                setCurrRow(row.id);
                            },
                            style: {
                                cursor: "pointer",
                                background: row.id === currRow ? c.lightGrey : null,
                                color: row.id === currRow ? c.darkBlue : c.white,
                            },
                        })}
                        rowHover={{ bg: c.lightMidnightBlue }}
                        currRow={currRow}
                        searchInput={searchTerm}
                    />
                </Flex>
            </Flex>

            {/* Right side of page */}
            <Flex height="100%" width="50%" direction="column">
                <CourseView
                    course={selectedCourse}
                    isNew={isAddingCourse}
                    isEditing={isEditing || isAddingCourse}
                    onEdit={() => setIsEditing(!isEditing)}
                    onDelete={(courseCode) => {
                        deleteCourse(courseCode);
                        setSearchTerm("");
                    }}
                    cancelUpdateCourse={cancelCourse}
                    updateCourse={saveCourse}
                    prefillCourse={prefillCourse}
                    setPrefill={setSelectedCourse}
                />
            </Flex>
        </Flex>
    );
};

export default Courses;
