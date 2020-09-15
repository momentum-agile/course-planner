import React from "react";
import { Flex, IconButton } from "@chakra-ui/core";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";

const HomeIcon = ({ width }) => {
    return (
        <Flex width={width}>
            <Link to="/">
                <IconButton as={AiFillHome} variantColor="black" left="20px" top="8px" size="sm" />
            </Link>
        </Flex>
    );
};

export default HomeIcon;
