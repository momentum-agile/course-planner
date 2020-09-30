import React, { useState, useEffect } from "react";
import { Flex, Text, useToast } from "@chakra-ui/core";
import { FieldsPane, PlansPane } from "./editables";
import { colors as c } from "../../colors";

// Regex from: https://www.kb.sit.auckland.ac.nz/2014/02/21/upi/
const upiRegex = /[a-zA-Z]{1,4}[0-9]{3}$/;
// The student ID can be 7 to 10 digits long
const idRegex = /(\d{7}|\d{8}|\d{9}|\d{10})$/;

const toastBase = {
    title: "Error when trying to create student",
    status: "error",
    duration: 9000,
    isClosable: true,
};

const StudentView = ({ student, programmes, allPlans, isNew, isEditing, onEdit, onDelete, onCancel, onSave }) => {
    const toast = useToast();

    const [name, setName] = useState("");
    const [upi, setUpi] = useState("");
    const [id, setId] = useState("");

    useEffect(() => {
        const { name, upi, id } = student;

        setName(name || "");
        setUpi(upi || "");
        setId(id || "");
    }, [student]);

    const studentPlans = () => {
        return student && student.plans && allPlans.length
            ? student.plans
                  .map((id) => allPlans && allPlans.find((plan) => plan._id === id))
                  .map((plan) => ({
                      ...plan,
                      programmeName:
                          programmes.find((programme) => programme._id === plan.programmeDegree) &&
                          programmes.find((programme) => programme._id === plan.programmeDegree).name,
                  }))
            : [];
    };

    const setField = {
        name: setName,
        upi: setUpi,
        id: setId,
    };

    const changeField = (field, value) => {
        setField[field](value);
    };

    const saveStudent = () => {
        if (!upiRegex.test(upi)) {
            toast({ ...toastBase, description: "Student UPI is incorrectly formatted. Should be e.g. nbha101" });
            return;
        }

        if (!idRegex.test(id)) {
            toast({ ...toastBase, description: "Student ID is either too long or short. Should be 7-10 digits" });
            return;
        }

        const editedStudent = { ...student };
        editedStudent.name = name;
        editedStudent.upi = upi;
        editedStudent.id = id;

        onSave(editedStudent);
    };

    return (
        <Flex height="100vh" direction="column" pt="30px" pr="10px">
            <FieldsPane
                name={name}
                upi={upi}
                id={id}
                isNew={isNew}
                isEditing={isEditing}
                onChange={changeField}
                onEdit={onEdit}
                onDelete={onDelete}
                onCancel={onCancel}
                onSave={saveStudent}
            />

            {isNew ? (
                <Flex justifyContent="center" marginTop="20%" color={c.whiteGrey}>
                    <Text fontStyle="italic">First create the student to add plans</Text>
                </Flex>
            ) : (
                <Flex mt="10px">
                    <PlansPane student={student} programmes={programmes} plans={studentPlans()} onSave={onSave} />
                </Flex>
            )}
        </Flex>
    );
};

export default StudentView;
