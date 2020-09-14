import React from "react";
import { Flex, Button } from "@chakra-ui/core";

const SaveCancelButtonSet = ({ onCancel, onSave, isActive }) => {
    const isDisabled = !isActive;

    return (
        <Flex width="100%" padding="5" justify="center" direction="row">
            <Button isDisabled={isDisabled} variantColor="red" onClick={onCancel}>
                Cancel
            </Button>
            <Button isDisabled={isDisabled} variantColor="green" onClick={onSave}>
                Save
            </Button>
        </Flex>
    );
};

export default SaveCancelButtonSet;
