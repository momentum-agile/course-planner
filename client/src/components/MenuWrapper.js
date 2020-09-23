import React from "react";
import { Flex } from "@chakra-ui/core";
import { OptionsMenu, ConfirmationDialog } from ".";

const MenuWrapper = ({ item, itemType, setOpenConfirmationDialog, openConfirmationDialog, confirm, onEdit }) => {
    return (
        <Flex>
            <OptionsMenu confirm={confirm} onEdit={onEdit} onDelete={() => setOpenConfirmationDialog(true)} />
            <ConfirmationDialog
                item={item}
                itemType={itemType}
                action={"Delete"}
                isOpen={openConfirmationDialog}
                onClose={() => setOpenConfirmationDialog(false)}
                confirm={confirm}
            />
        </Flex>
    );
};

export default MenuWrapper;
