import React, { useEffect, useState } from "react";
import { Flex, Text, Checkbox, Tag, Tooltip, Icon } from "@chakra-ui/core";
import { colors as c } from "../../../colors";

const IsPlaceholderField = ({ value, isEditing, onChange }) => {
    const [isPlaceholder, setIsPlaceholder] = useState([]);
    const tooltipString = "A placeholder course can be added multiple times within the same plan.";
    useEffect(() => {
        setIsPlaceholder(value);
    }, [value]);

    const updateIsPlaceholder = (c) => {
        setIsPlaceholder(c);
        onChange("placeholder", c);
    };

    return (
        <Flex>
            {!isEditing ? (
                value && (
                    <Flex justify="center">
                        <Tag height="10px" mt="20px" size="md" rounded="full" variant="solid" variantColor="teal" mr={1}>
                            Placeholder
                        </Tag>
                    </Flex>
                )
            ) : (
                <Flex direction="column" alignItems="center">
                    <Flex alignContent="center" justifyContent="center">
                        <Text color={c.darkBlue} fontWeight="bold">
                            Placeholder Course
                        </Text>
                        <Tooltip label={tooltipString} placement="left" bg={c.midnightBlue} color={c.whiteGrey}>
                            <Icon name="question-outline" color={c.darkBlue} marginLeft="5px" alignSelf="center" />
                        </Tooltip>
                    </Flex>
                    <Checkbox
                        pt="10px"
                        borderColor={c.lightBlue}
                        isChecked={isPlaceholder}
                        onChange={(e) => updateIsPlaceholder(e.target.checked)}
                    />
                </Flex>
            )}
        </Flex>
    );
};

export default IsPlaceholderField;
