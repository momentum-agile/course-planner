import React, { useEffect, useState } from "react";
import { Flex, Text, Button, Divider, Input, IconButton } from "@chakra-ui/core";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import Table from "./Table";
import useStudents from "./useStudents";
import ViewStudent from "./ViewStudent";
import AddStudent from "./AddStudent";

const StudentPage = () => {
    const [currRow, setCurrRow] = useState("0");
    const [searchInput, setSearchInput] = useState("");
    const [selectedStudent, setSelectedStudent] = useState({});
    const [addingStudent, setAddingStudent] = useState(false);
    const { data, columns, editStudent, deleteStudent, addStudent } = useStudents();

    useEffect(() => {
        setSelectedStudent(data[currRow] || {});
    }, [data, currRow]);

    return (
        <Flex height="100vh" width="100%" direction="row" backgroundColor="#F0F0F0">
            <Flex height="100%" width="50%" direction="column">
                <Flex left="1px" justify="flex-start">
                    <Link to="/">
                        <IconButton as={AiFillHome} left="20px" top="20px" size="sm" />
                    </Link>
                </Flex>
                <Flex width="100%" justify="center" marginTop="20px">
                    <Text textAlign="center" fontSize="5xl" color="#113F73">
                        Students
                    </Text>
                </Flex>
                <Flex width="100%" align="center" justify="center" direction="row">
                    <Flex width="70%">
                        <Input
                            variant="filled"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            backgroundColor="#D3D3D3"
                            placeholder="Search Students"
                        />
                    </Flex>
                    <Flex p={2} marginLeft={2}>
                        <Button
                            variantColor="blue"
                            backgroundColor="#162971"
                            onClick={() => {
                                setCurrRow();
                                setAddingStudent(true);
                            }}
                        >
                            <Text textAlign="center" color="white">
                                Add Student
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
                                setAddingStudent(false);
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
            <Flex height="100%" width="50%" direction="column">
                {addingStudent ? (
                    <AddStudent addStudent={addStudent} />
                ) : (
                    <ViewStudent student={selectedStudent} editStudent={editStudent} deleteStudent={deleteStudent} />
                )}
            </Flex>
        </Flex>
    );
};

export default StudentPage;
