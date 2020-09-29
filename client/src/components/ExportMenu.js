import React from "react";
import { Menu, MenuButton, MenuList, MenuGroup, MenuItem, Text, Flex, IconButton } from "@chakra-ui/core";
import { colors as c } from "../colors";

const ExportMenu = ({ onExportMarkdown, onExportPDF }) => {
    return (
        <Flex>
            <Menu>
                {({ isOpen }) => (
                    <React.Fragment>
                        <MenuButton>
                            <IconButton
                                icon="download"
                                size="xs"
                                _active={{ bg: c.darkBlue, color: c.whiteGrey }}
                                _hover={isOpen ? { bg: c.darkBlue, color: c.whiteGrey } : { bg: c.lightGrey, color: c.black }}
                                bg={isOpen ? c.darkBlue : "none"}
                                color={isOpen ? c.whiteGrey : c.black}
                            />
                        </MenuButton>
                        <MenuList placement="bottom-end" minWidth="160px">
                            <MenuGroup>
                                {onExportMarkdown && (
                                    <MenuItem onClick={onExportMarkdown}>
                                        <Text>Export to Markdown</Text>
                                    </MenuItem>
                                )}
                                {onExportPDF && (
                                    <MenuItem onClick={onExportPDF}>
                                        <Text>Export to PDF</Text>
                                    </MenuItem>
                                )}
                            </MenuGroup>
                        </MenuList>
                    </React.Fragment>
                )}
            </Menu>
        </Flex>
    );
};

export default ExportMenu;
