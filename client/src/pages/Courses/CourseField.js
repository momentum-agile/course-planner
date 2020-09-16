import React from "react";
import { Flex, Text, Box, Select, Editable, EditableInput, EditablePreview } from "@chakra-ui/core";

const points = [15, 20, 30];

const CourseField = ({ type, title, value, onChange, required = false }) => {
    return (
        <Flex height="100%" width="100%" direction="row" paddingTop="2">
            {type === "simple" ? (
                <InlineEdit
                    onSubmit={() => console.log("SUBMIT")}
                    onCancel={() => console.log("CANCEL")}
                    title={title}
                    value={value}
                    placeholder={`Add a ${title}`}
                    onChange={onChange}
                />
            ) : (
                <InLineNumber title={title} value={value} onChange={onChange} />
            )}
        </Flex>
    );
};

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

const InLineNumber = ({ onChange, value, title }) => {
    return (
        <Flex fontSize="2xl" justify="space-around" marginTop="8px">
            <Box>
                <Text> {title}: </Text>
            </Box>
            <Select ml={5} value={value} onChange={onChange}>
                {points.map((val) => (
                    <option value={val}>{val} points</option>
                ))}
            </Select>
        </Flex>
    );
};

export default CourseField;
