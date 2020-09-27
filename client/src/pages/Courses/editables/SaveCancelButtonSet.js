import React from "react";
import { Flex, Button } from "@chakra-ui/core";
import { colors as c } from "../../../colors";

const SaveCancelButtonSet = ({ onCancel, onSave, isActive }) => {

    return (
        <Flex width="100%" direction="row" justifyContent="center">
            <Button width="65px"
                marginRight="10px"
                color={c.midnightBlue}
                bg={c.whiteGrey}
                border="2px"
                borderColor={c.midnightBlue}
                _hover={{ bg: c.red, color: c.white, borderColor: c.red }}
                onClick={onCancel}
            >
                Cancel
            </Button>

            <Button width="65px"
                marginLeft="10px"
                color={c.midnightBlue}
                bg={c.whiteGrey}
                border="2px"
                borderColor={c.midnightBlue}
                _hover={isActive && { bg: c.green, color: c.white, borderColor: c.green }}
                isDisabled={!isActive}
                onClick={onSave}
            >
                Save
            </Button>
        </Flex>
    );
};

export default SaveCancelButtonSet;
