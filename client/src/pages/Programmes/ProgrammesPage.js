import React, { useEffect, useState } from "react";
import { Flex, Text, SimpleGrid, IconButton } from "@chakra-ui/core";
import { Link, useParams } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { SearchBar, ProgrammeCard } from "../../components";
import ExistingProgramme from "./ExistingProgramme";
import EmptyProgramme from "./EmptyProgramme";
import NewProgramme from "./NewProgramme";
import useProgrammmes from "./useProgrammes";

const ProgrammesPage = () => {
    const location = useParams();
    const { programmeDegrees, fetchAllProgrammes } = useProgrammmes();
    const [numOfProgrammes, setNumOfProgrammes] = useState(programmeDegrees.length);

    useEffect(fetchAllProgrammes, [numOfProgrammes]);

    // Triggers an update to the list of programmes to add new programmes
    const updateList = () => {
        setNumOfProgrammes(numOfProgrammes + 1);
    };

    const renderProgramme = (location) => {
        // Obtain programme ID using query parameter

        const programme = programmeDegrees.find((f) => f._id === location.id);

        return programme ? <ExistingProgramme programme={programme} notifyUpdate={updateList} /> : <EmptyProgramme />;
    };

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
                <Flex width="102%" justify="center" align="center" overflowY="scroll" marginTop="15px" marginBottom="15px">
                    <SimpleGrid columns={2} spacingX="50px" spacingY="10px" height="100%">
                        <ProgrammeCard to="new" />
                        {programmeDegrees.map((programme) => {
                            return <ProgrammeCard to={programme._id} programme={programme} />;
                        })}
                    </SimpleGrid>
                </Flex>
            </Flex>
            {/* RHS of the page */}
            <Flex width="50%" backgroundColor="#F0F0F0">
                <Flex width="100%" direction="column" marginTop="60px">
                    {location.id === "new" ? <NewProgramme notifyAddition={updateList} /> : renderProgramme(location)}
                </Flex>
            </Flex>
        </Flex>
    );
};

export default ProgrammesPage;
