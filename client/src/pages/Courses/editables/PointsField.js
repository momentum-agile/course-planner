import React from "react";
import { Flex, Text, Select, Tag } from "@chakra-ui/core";
import { colors as c } from "../../../colors";

const points = [15, 20, 30, 45, 60];

const PointsField = ({ value, isEditing, onChange }) => {
    return (
        <Flex direction="column">
            <Text color={c.darkBlue} fontWeight="bold">
                Points
            </Text>

            {!isEditing ? (
                <Flex justify="center">
                    <Tag size="md" rounded="full" variant="solid" variantColor="cyan">
                        {value}
                    </Tag>
                </Flex>
            ) : (
                <Select value={value} onChange={(e) => onChange("pts", e.target.value)}>
                    {points.map((val, i) => (
                        <option value={val} key={i}>
                            {val} points
                        </option>
                    ))}
                </Select>
            )}
        </Flex>
    );
};

export default PointsField;
