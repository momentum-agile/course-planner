import React from "react";
import { Menu, MenuButton, MenuList, MenuGroup, MenuItem, Icon, Text, Flex, IconButton } from "@chakra-ui/core";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import ConfirmationDialog from "./ConfirmationDialog";

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
                                _active={{ bg: "#063b59", color: "#F2F2F2" }}
                                _hover={isOpen ? { bg: "#063b59", color: "#F2F2F2" } : { bg: "#D3D3D3", color: "black" }}
                                bg={isOpen ? "#063b59" : "none"}
                                color={isOpen ? "#F2F2F2" : "black"}
                            />
                        </MenuButton>
                        <MenuList placement="bottom-end" minWidth="160px">
                            <MenuGroup>
                                <MenuItem onClick={() => setOpenConfirmationDialog(true)}>
                                    <Icon name="delete" mr={3} color="red.500" />
                                    <Text color="red.500">Delete</Text>
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
