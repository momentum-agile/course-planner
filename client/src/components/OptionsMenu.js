import React from "react";
import { Menu, MenuButton, MenuList, MenuGroup, MenuItem, Icon, Text, Flex, IconButton } from "@chakra-ui/core";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import ConfirmationDialog from "./ConfirmationDialog";
import { colors as c } from "../colors";

const OptionsMenu = ({ item, itemType, setOpenConfirmationDialog, openConfirmationDialog, confirm, hasEdit, onEdit }) => {
    return (
        <Flex>
            <Menu>
                {({ isOpen }) => (
                    <React.Fragment>
                        <MenuButton>
                            <IconButton
                                as={BiDotsHorizontalRounded}
                                size="xs"
                                _active={{ bg: c.darkBlue, color: c.whiteGrey }}
                                _hover={isOpen ? { bg: c.darkBlue, color: c.whiteGrey } : { bg: c.lightGrey, color: c.black }}
                                bg={isOpen ? c.darkBlue : "none"}
                                color={isOpen ? c.whiteGrey : c.black}
                            />
                        </MenuButton>
                        <MenuList placement="bottom-end" minWidth="160px">
                            <MenuGroup>
                                <MenuItem onClick={() => setOpenConfirmationDialog(true)}>
                                    <Icon name="delete" mr={3} color={c.red} />
                                    <Text color={c.red}>Delete</Text>
                                </MenuItem>
                                {hasEdit && (
                                    <MenuItem onClick={onEdit}>
                                        <Icon name="edit" mr={3} />
                                        <Text>Edit</Text>
                                    </MenuItem>
                                )}
                            </MenuGroup>
                        </MenuList>
                    </React.Fragment>
                )}
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
