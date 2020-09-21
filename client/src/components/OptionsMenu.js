import React from "react";
import { Menu, MenuButton, MenuList, MenuGroup, MenuItem, Icon, Text, Flex } from "@chakra-ui/core";
import { BsThreeDots } from "react-icons/bs";
import ConfirmationDialog from "./ConfirmationDialog";

const OptionsMenu = ({ item, itemType, setOpenConfirmationDialog, openConfirmationDialog, confirm, hasEdit, onEdit }) => {
    return (
        <Flex>
            <Menu>
                <MenuButton>
                    <Flex align="center" justify="center">
                        <Icon as={BsThreeDots} size="60px" />
                    </Flex>
                </MenuButton>
                <MenuList>
                    <MenuGroup title="Options">
                        <MenuItem onClick={() => setOpenConfirmationDialog(true)}>
                            <Text color="red.500">Delete</Text>
                        </MenuItem>
                        {hasEdit && (
                            <MenuItem onClick={onEdit}>
                                <Text>Edit</Text>
                            </MenuItem>
                        )}
                    </MenuGroup>
                </MenuList>
            </Menu>
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

export default OptionsMenu;
