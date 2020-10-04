import React, { useState } from "react";
import { Flex, Text } from "@chakra-ui/core";
import { MenuWrapper, SaveCancelButtonSet } from "../../../components";
import TextField from "./TextField";
import { colors as c } from "../../../colors";

const FieldsPane = ({ item, name, upi, id, isNew, isEditing, onEdit, onChange, onDelete, onCancel, onSave }) => {
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    return (
        <Flex direction="column" margin="5px" padding="10px" borderRadius="5px" bg={c.whiteGrey} boxShadow="md">
            {isNew ? (
                <Flex direction="column" justifyContent="center">
                    <Text textAlign="center" fontSize="40px" fontWeight="bold" color={c.darkBlue}>
                        Create a new student
                    </Text>
                </Flex>
            ) : (
                <Flex justifyContent="flex-end">
                    <MenuWrapper
                        item={item}
                        detail={upi}
                        itemType="Student"
                        onEdit={onEdit}
                        setOpenConfirmationDialog={setOpenConfirmationDialog}
                        openConfirmationDialog={openConfirmationDialog}
                        confirm={() => onDelete(upi)}
                    />
                </Flex>
            )}

            <Flex justify="center">
                <TextField isRequired title="name" value={name} isEditing={isEditing} onChange={onChange} />
            </Flex>
            <Flex justify="center">
                <TextField isRequired title="upi" value={upi} isEditing={isEditing} onChange={onChange} />
                <TextField isRequired title="id" value={id} isEditing={isEditing} onChange={onChange} />
            </Flex>

            <Flex direction="row" marginTop="30px">
                {isEditing && <SaveCancelButtonSet isActive={name && upi && id} onCancel={onCancel} onSave={onSave} />}
            </Flex>
        </Flex>
    );
};

export default FieldsPane;
