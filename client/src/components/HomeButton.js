import React from "react";
import { Link } from "react-router-dom";
import { IconButton } from "@chakra-ui/core";
import { AiFillHome } from "react-icons/ai";

const HomeButton = () => {
    return (
        <Link to="/">
            <IconButton as={AiFillHome} variantColor="black" left="20px" top="20px" size="xs" _hover={{ transform: "scale(1.1, 1.1)" }} />
        </Link>
    );
};

export default HomeButton;
