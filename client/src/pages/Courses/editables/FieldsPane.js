import React from "react";
import { Button, Flex, Text } from '@chakra-ui/core';
import { OptionsMenu } from "../../../components"
import TextField from './TextField';
import SemesterField from './SemesterField';
import PointsField from './PointsField';
import SaveCancelButtonSet from "./SaveCancelButtonSet";
import { colors as c } from "../../../colors";

const FieldsPane = ({ code, name, desc, sem, pts, isNew, isEditing, onChange, onEdit, onDelete, onCancel, onSave, prefillCourse, isValidCourseCode }) => {

    return (
        <Flex direction="column" margin="5px" padding="10px" borderRadius="5px" bg={c.lightGrey} boxShadow="md">
            {isNew
                ? (
                    <Flex direction="column" justifyContent="center">
                        <Text fontSize="50px" fontWeight="bold" color={c.darkBlue}>Create a new course</Text>
                    </Flex>
                ) : (
                    <Flex justifyContent="flex-end">
                        <OptionsMenu onEdit={onEdit} onDelete={() => onDelete(code)} />
                    </Flex>
                )
            }

            <TextField isRequired name="code" title="code" value={code} isEditing={isEditing} onChange={onChange} />
            <TextField name="name" title="name" value={name} isEditing={isEditing} onChange={onChange} />
            <TextField name="desc" title="description" value={desc} isEditing={isEditing} onChange={onChange} />

            <Flex justify="space-around" marginTop="15px">
                <SemesterField value={sem} isEditing={isEditing} onChange={onChange} />
                <PointsField value={pts} isEditing={isEditing} onChange={onChange} />
            </Flex>

            <Flex direction="row" marginTop="30px">
                {isEditing && <SaveCancelButtonSet isActive={code} onCancel={onCancel} onSave={onSave} />}
                {isNew &&
                    <Button width="250px" variantColor="blue" backgroundColor={c.lightBlue} onClick={prefillCourse} isDisabled={!code || !isValidCourseCode} _hover={!code && {}}>
                        Auto-Generate Course
                    </Button>}
            </Flex>
        </Flex >
    );
}

export default FieldsPane;