import React from "react";
import { Editable, EditableInput, EditablePreview, Box, Text } from "@chakra-ui/core";

const InlineEdit = ({ onSubmit, onCancel, onChange, value, title, placeholder }) => {
    return (
        <Editable
            value={value}
            onSubmit={onSubmit}
            onCancel={onCancel}
            onChange={onChange}
            marginTop="8px"
            textAlign="center"
            fontSize="2xl"
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignContent="center"
            placeholder={placeholder}
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
