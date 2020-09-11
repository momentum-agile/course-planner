import React from "react";
import { Editable, EditableInput, EditablePreview, Box, Text } from "@chakra-ui/core";

const InlineEdit = ({ onSubmit, onCancel, onChange, value, title, isDisabled }) => {
    return (
        <Editable
            value={value}
            onSubmit={onSubmit}
            onChange={onChange}
            isDisabled={isDisabled}
            marginTop="8px"
            textAlign="center"
            fontSize="2xl"
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignContent="center"
        >
            <Box>
                <Text> {title}: </Text>
            </Box>
            <Box>
                <EditablePreview ml={3} height={10} />
            </Box>
            <Box>
                <EditableInput ml={3} height={10} />
            </Box>
        </Editable>
    );
};

export default InlineEdit;
