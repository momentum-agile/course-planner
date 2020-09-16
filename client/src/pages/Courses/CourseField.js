import React from "react";
import { InlineEdit } from "../../components";
import { Flex, Text, Box, Select } from "@chakra-ui/core";

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
