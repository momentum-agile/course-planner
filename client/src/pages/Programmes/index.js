import React from "react";
import { Flex, Text, SimpleGrid, IconButton } from "@chakra-ui/core";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { SearchBar, ProgrammeCard } from "../../components";
import { ExistingProgramme, EmptyProgramme, NewProgramme } from "..";

const Programmes = () => {
    const location = useLocation();

    return (
        <Flex height="100vh" width="100%" direction="row">
            <Flex width="50%" backgroundColor="#2A2A2A" direction="column">
                <Flex left="1px" justify="flex-start">
                    <Link to="/">
                        <IconButton as={AiFillHome} variantColor="black" left="20px" top="20px" size="sm" />
                    </Link>
                </Flex>
                <Flex width="100%" justify="center" marginTop="20px">
                    <Text textAlign="center" fontSize="5xl" color="#F0F0F0">
                        Programmes
                    </Text>
                </Flex>
                {/* TODO: Implement search functionality */}
                <SearchBar searchCategory="Programmes" />
                <Flex width="100%" justify="center" align="center">
                    <SimpleGrid columns={2} spacingX="50px" spacingY="10px" marginTop="10px">
                        <ProgrammeCard to="new" />
                        {/* TODO: Populate programmes here */}
                        <ProgrammeCard programmeName="MEngSt SE" to="1" />
                        <ProgrammeCard programmeName="BE (Hons) SE" to="2" />
                    </SimpleGrid>
                </Flex>
            </Flex>
            <Flex width="50%" backgroundColor="#F0F0F0">
                <Flex width="100%" direction="column" marginTop="60px">
                    {location.pathname === "/programmes/new" ? <NewProgramme /> : renderProgramme(location)}
                </Flex>
            </Flex>
        </Flex>
    );
};

const renderProgramme = (location) => {
    const selectedProgramme = location.pathname.charAt(location.pathname.length - 1);

    return !isNaN(selectedProgramme) ? <ExistingProgramme id={selectedProgramme} /> : <EmptyProgramme />;
};

export default Programmes;
