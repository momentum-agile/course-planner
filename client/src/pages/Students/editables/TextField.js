import React from "react";
import { Flex, Text, Box, Divider, FormControl, FormLabel, Input } from "@chakra-ui/core";
import { colors as c } from "../../../colors";

const placeholders = {
    name: "e.g. Nisarag Bhatt",
    upi: "e.g. nbha101",
    id: "e.g. 123456789",
};

const TextField = ({ isRequired = false, title, value, isEditing, onChange }) => {
    return !isEditing ? (
        <Box>
            {title === "name" ? (
                <Flex justify="center" pt="10px" pb="3px">
                    <Text fontSize="25px" color={c.white} bg={c.lightBlue} p="8px" borderRadius="8px">
                        {value}
                    </Text>
                </Flex>
            ) : (
                <Flex direction="column" alignItems="center" p="10px">
                    <Text color={c.darkBlue} fontWeight="bold">
                        {title.toUpperCase()}
                    </Text>
                    <Text p="8px">{value}</Text>
                </Flex>
            )}

            <Divider borderColor={c.grey} />
        </Box>
    ) : (
        <Flex>
            <FormControl isRequired={isRequired} p="4px" justifyContent="center">
                <FormLabel color={c.darkBlue} fontWeight="bold">
                    {title.toUpperCase()}
                </FormLabel>
                <Input
                    overflowWrap="break-word"
                    placeholder={placeholders[title]}
                    value={value}
                    onChange={(e) => onChange(title, e.target.value)}
                />
            </FormControl>
        </Flex>
    );
};

export default TextField;
