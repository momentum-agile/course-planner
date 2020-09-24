import React from "react";
import { Flex, Button } from "@chakra-ui/core";
import { colors as c } from "../../../colors";

const SaveCancelButtonSet = ({ onCancel, onSave, isActive }) => {

    return (
        <Flex width="100%" direction="row" justifyContent="center">
            <Button width="65px"
                marginRight="10px"
                color={c.lightBlue}
                bg={c.darkBlue}
                _hover={{ bg: c.red, color: c.white }}
                onClick={onCancel}
            >
                Cancel
            </Button>

            <Button width="65px"
                marginLeft="10px"
                color={c.lightBlue}
                bg={c.darkBlue}
                _hover={isActive && { bg: c.green, color: c.white }}
                isDisabled={!isActive}
                onClick={onSave}
            >
                Save
            </Button>
        </Flex>
    );
};

export default SaveCancelButtonSet;
