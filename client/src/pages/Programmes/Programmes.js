import React, { useEffect, useState } from "react";
import { Flex, Text, SimpleGrid, Button, Icon } from "@chakra-ui/core";
import { useParams } from "react-router-dom";
import { SearchBar, ProgrammeCard } from "../../components";
import ExistingProgramme from "./ExistingProgramme";
import EmptyProgramme from "./EmptyProgramme";
import NewProgrammeModal from "./NewProgrammeModal";
import useProgrammmes from "./useProgrammes";
import filter from "@mcabreradev/filter";
import { colors as c } from "../../colors";
import HomeButton from "../../components/HomeButton";

const Programmes = () => {
    const location = useParams();
    const { programmeDegrees, fetchAllProgrammes } = useProgrammmes();
    const [numOfProgrammes, setNumOfProgrammes] = useState(programmeDegrees.length);
    const [searchTerm, setSearchTerm] = useState("");
    const [isCreatingProgramme, setIsCreatingProgramme] = useState(false);

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
            <Flex width="50%" backgroundColor={c.midnightBlue} direction="column">
                <Flex left="1px" justify="flex-start">
                    <HomeButton />
                </Flex>

                <Flex width="100%" justify="center" marginTop="20px">
                    <Text textAlign="center" fontSize="5xl" color={c.whiteGrey}>
                        Programmes
                    </Text>
                </Flex>

                <SearchBar searchCategory="Programmes" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

                {/* TODO: style scrollbar */}
                <Flex width="100%" justify="center" align="flex-start" overflowY="auto" marginTop="15px" marginBottom="15px" height="100%">
                    <SimpleGrid columns={2} spacingX="50px">
                        {/* Create new Programme Button */}
                        <Button
                            backgroundColor={c.nightBlue}
                            border="none"
                            rounded="20px"
                            width="300px"
                            height="150px"
                            marginTop="20px"
                            _hover={{ transform: "scale(1.05, 1.05)" }}
                            _active={{}}
                            onClick={() => setIsCreatingProgramme(true)}
                        >
                            <Text textAlign="center" fontSize="2xl" color={c.white}>
                                <Icon name="add" color={c.white} />
                            </Text>
                        </Button>

                        {/* List of Programmes */}
                        {filter(programmeDegrees, { name: searchTerm }).map((programme) => (
                            <ProgrammeCard currentID={location.id} to={programme._id} programme={programme} />
                        ))}
                    </SimpleGrid>
                </Flex>
            </Flex>

            {/* RHS of the page */}
            <Flex width="50%" backgroundColor={c.whiteGrey}>
                <NewProgrammeModal notifyAddition={updateList} isOpen={isCreatingProgramme} onClose={() => setIsCreatingProgramme(false)} />
                <Flex width="100%" direction="column" marginTop="60px">
                    {renderProgramme(location)}
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Programmes;
