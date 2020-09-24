import React, { useEffect, useState } from "react";
import { Flex, Text, Button, Divider } from "@chakra-ui/core";
import { Table, SearchBar, NavigationMenu } from "../../components";
import useCourses from "./useCourses";
import { colors as c } from "../../colors";
import AddAllCourse from "./AddAllCourse";
import CourseView from "./CourseView";

const Courses = () => {
    const [currRow, setCurrRow] = useState("0");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCourse, setSelectedCourse] = useState({});
    const [isAddingCourse, setIsAddingCourse] = useState(false);
    const [populateFromUniAPI, setPopulateFromUniAPI] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const { data, columns, createCourse, updateCourse, deleteCourse, createAllCoursesFromUniAPI, prefillCourse } = useCourses();

    useEffect(() => {
        setSelectedCourse(isAddingCourse ? {} : data[currRow] || {});
        setIsEditing(false);
    }, [data, currRow, isAddingCourse]);

    const cancelCourse = () => {
        setIsEditing(false);
        setIsAddingCourse(false);
    };

    const saveCourse = (toSave) => {
        if (isAddingCourse) {
            createCourse(toSave);
            setIsAddingCourse(false);
            setCurrRow(currRow + 1);
            setSelectedCourse(toSave);
        } else {
            updateCourse(toSave);
        }
    };

    return (
        <Flex height="100vh" width="100%" direction="row" backgroundColor={c.whiteGrey}>
            <Flex height="100%" width="50%" direction="column">
                <Flex left="1px" justify="flex-start">
                    <NavigationMenu />
                </Flex>
                <Flex width="100%" align="center" justify="center" marginTop="20px" p={4}>
                    <Text textAlign="center" fontSize="4xl" color={c.uoaBlue}>
                        Courses
                    </Text>
                </Flex>

                <Flex width="100%" align="center" justify="center" direction="row">
                    <SearchBar searchCategory="Courses" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <Flex p={2} marginLeft={2}>
                        <Button
                            variantColor="blue"
                            backgroundColor={c.lightBlue}
                            onClick={() => {
                                setCurrRow();
                                setSelectedCourse({});
                                setIsAddingCourse(true);
                            }}
                        >
                            <Text textAlign="center" color={c.white}>
                                + Add Course
                            </Text>
                        </Button>
                        <Button
                            variantColor="blue"
                            backgroundColor="#162971"
                            onClick={() => {
                                setPopulateFromUniAPI(true);
                            }}
                        >
                            <Text textAlign="center" color="white">
                                + Create From Uni API
                            </Text>
                        </Button>
                        <AddAllCourse
                            isOpen={populateFromUniAPI}
                            onClose={() => setPopulateFromUniAPI(false)}
                            confirm={createAllCoursesFromUniAPI}
                        ></AddAllCourse>
                    </Flex>
                </Flex>

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
                                background: row.id === currRow ? c.uoaBlue : null,
                            },
                        })}
                        currRow={currRow}
                        searchInput={searchTerm}
                    />
                </Flex>
            </Flex>
            <Divider orientation="vertical" backgroundColor={c.iceBlue} width="2px" />
            {/* Right side of page */}
            <Flex height="100%" width="50%" direction="column">
                <CourseView
                    course={selectedCourse}
                    isNew={isAddingCourse}
                    isEditing={isEditing || isAddingCourse}
                    onEdit={() => setIsEditing(true)}
                    onDelete={deleteCourse}
                    cancelUpdateCourse={cancelCourse}
                    updateCourse={saveCourse}
                    prefillCourse={prefillCourse}
                />
            </Flex>
        </Flex>
    );
};

export default Courses;
