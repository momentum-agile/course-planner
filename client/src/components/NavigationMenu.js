import React from "react";
import { useHistory, useLocation } from "react-router-dom"
import { Text, Menu, MenuButton, MenuList, MenuGroup, MenuItem, Box, IconButton } from '@chakra-ui/core';
import { GiHamburgerMenu } from "react-icons/gi";
import { AiFillHome, AiFillBook, AiFillSchedule } from "react-icons/ai";
import { BsFillPersonLinesFill } from "react-icons/bs"

const darkBlue = "#063b59";
const lightBlue = "#3dafdb";

const NavigationMenu = () => {
    const history = useHistory();
    const path = useLocation().pathname.split("/")[1];

    return (
        <Menu>
            <MenuButton as={IconButton} icon={GiHamburgerMenu} bg="transparent" color={path === "programmes" || path === "" ? lightBlue : darkBlue} />

            <MenuList bg={darkBlue}>
                <Text paddingLeft="10px" paddingBottom="10px" fontWeight="bold" color={lightBlue}>Navigation</Text>

                <MenuGroup >
                    {path !== "" &&
                        <MenuItem onClick={() => history.push("/")} color={lightBlue}>
                            <Box as={AiFillHome} />
                            <Text paddingLeft="10px">Home</Text>
                        </MenuItem>
                    }

                    {path !== "students" &&
                        <MenuItem onClick={() => history.push("/students")} color={lightBlue}>
                            <Box as={BsFillPersonLinesFill} size="" />
                            <Text paddingLeft="10px">Students</Text>
                        </MenuItem>
                    }

                    {path !== "courses" &&
                        <MenuItem onClick={() => history.push("/courses")} color={lightBlue}>
                            <Box as={AiFillBook} />
                            <Text paddingLeft="10px">Courses</Text>
                        </MenuItem>
                    }

                    {path !== "programmes" &&
                        <MenuItem onClick={() => history.push("/programmes")} color={lightBlue}>
                            <Box as={AiFillSchedule} />
                            <Text paddingLeft="10px">Programmes</Text>
                        </MenuItem>
                    }
                </MenuGroup>
            </MenuList>
        </Menu >
    );
}

export default NavigationMenu;