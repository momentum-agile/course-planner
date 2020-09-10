import React, { useEffect, useState } from "react";
import { Flex, Text, Button, Divider, Input } from "@chakra-ui/core";
import Table from "./Table";
import CreateCourse from "./CreateCourse";
import ViewCourse from "./ViewCourse";
import useCourses from "./useCourses";

const CoursesPage = () => {
    const [currRow, setCurrRow] = useState("0");
    const [searchInput, setSearchInput] = useState("");
    const [selectedCourse, setSelectedCourse] = useState({});
    const [addingCourse, setAddingCourse] = useState(false);
    const { data, columns, updateCourse } = useCourses();

    useEffect(() => {
        setSelectedCourse(data[currRow] || {});
    }, [data, currRow]);

    return (
        <Flex height="100vh" width="100%" direction="row" backgroundColor="#F0F0F0">
            <Flex height="100%" width="50%" direction="column">
                <Flex width="100%" align="center" justify="center" marginTop="20px" p={4}>
                    <Text textAlign="center" fontSize="4xl" color="#113F73">
                        Courses
                    </Text>
                </Flex>
                <Flex width="100%" align="center" justify="center" direction="row">
                    <Flex width="70%">
                        <Input
                            variant="filled"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            backgroundColor="#D3D3D3"
                            placeholder="Search Courses"
                        />
                    </Flex>
                    <Flex p={2} marginLeft={2}>
                        <Button
                            variantColor="blue"
                            backgroundColor="#162971"
                            onClick={() => {
                                setCurrRow();
                                setAddingCourse(true);
                            }}
                        >
                            <Text textAlign="center" color="white">
                                + Add Course
                            </Text>
                        </Button>
                    </Flex>
                </Flex>
                <Flex p={4}>
                    <Table
                        columns={columns}
                        data={data}
                        getRowProps={(row) => ({
                            onClick: () => {
                                setAddingCourse(false);
                                setCurrRow(row.id);
                            },
                            style: {
                                cursor: "pointer",
                                background: row.id === currRow ? "#0F487E" : null,
                            },
                        })}
                        currRow={currRow}
                        searchInput={searchInput}
                    />
                </Flex>
            </Flex>
            <Divider orientation="vertical" backgroundColor="#A7C4E0" width="2px" />
            {/* Right side of page */}
            <Flex height="100%" width="50%" direction="column">
                {addingCourse ? <CreateCourse /> : <ViewCourse course={selectedCourse} updateCourse={updateCourse}/>}
            </Flex>
        </Flex>
    );
};

export default CoursesPage;
