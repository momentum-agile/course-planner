import React from "react";
import { Flex, Text } from '@chakra-ui/core';
import { OptionsMenu, SaveCancelButtonSet } from "../../../components"
import TextField from './TextField';
import SemesterField from './SemesterField';
import PointsField from './PointsField';
import { colors as c } from "../../../colors";


const FieldsPane = ({ code, name, desc, sem, pts, isNew, isEditing, onChange, onEdit, onDelete, onCancel, onSave, prefillCourse, setPrefill }) => {

    return (
        <Flex direction="column" margin="5px" padding="10px" borderRadius="5px" bg={c.whiteGrey} boxShadow="md">
            {isNew
                ? (
                    <Flex direction="column" justifyContent="center">
                        <Text textAlign="center" fontSize="40px" fontWeight="bold" color={c.darkBlue}>Create a new course</Text>
                    </Flex>
                ) : (
                    <Flex justifyContent="flex-end">
                        <OptionsMenu onEdit={onEdit} onDelete={() => onDelete(code)} />
                    </Flex>
                )
            }

            <TextField isRequired name="code" title="code" value={code} isEditing={isEditing} onChange={onChange} prefillCourse={prefillCourse} setPrefill={setPrefill} onSave={onSave} />
            <TextField isRequired name="name" title="name" value={name} isEditing={isEditing} onChange={onChange} />
            <TextField name="desc" title="description" value={desc} isEditing={isEditing} onChange={onChange} />

            <Flex justify="space-around" marginTop="15px">
                <SemesterField value={sem} isEditing={isEditing} onChange={onChange} />
                <PointsField value={pts} isEditing={isEditing} onChange={onChange} />
            </Flex>

            <Flex direction="row" marginTop="30px">
                {isEditing && <SaveCancelButtonSet isActive={code && name} onCancel={onCancel} onSave={onSave} />}
            </Flex>
        </Flex >
    );
}

export default FieldsPane;