import React from "react";
import { Flex, IconButton } from "@chakra-ui/core";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { colors as c } from "../../colors";

const HomeIcon = ({ width }) => {
    return (
        <Flex width={width}>
            <Link to="/">
                <IconButton as={AiFillHome} variantColor={c.black} left="20px" top="8px" size="sm" />
            </Link>
        </Flex>
    );
};

export default HomeIcon;
