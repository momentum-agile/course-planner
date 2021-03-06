import React from "react";
import { Flex, Text, Image } from "@chakra-ui/core";
import { OutlineButton } from "../../components";
import { colors as c } from "../../colors";

const Home = () => {
    return (
        <Flex height="100vh" width="100%" direction="row">
            <Flex width="70%" backgroundColor={c.iceBlue} direction="column" justify="center">
                <Flex width="100%" height="100%" align="center" justify="center">
                    <Image
                        htmlWidth="1200px"
                        htmlHeight="600px"
                        objectFit="cover"
                        src="./Tile.png"
                        alt="Homepage image of Calendar/Tile Placer from Canva"
                    />
                </Flex>
                <Image src="./momentum_logo.png" alt="Team Momentum Logo" width="10%" mb={2} ml={2} />
            </Flex>

            <Flex width="30%" backgroundColor={c.white}>
                <Flex width="100%" direction="column" marginTop="60px">
                    <Flex marginTop="30px" align="center" justify="center" direction="column">
                        <Text textAlign="center" fontSize="6xl" color={c.midnightBlue} as="b">
                            Course Planner
                        </Text>
                        <Text textAlign="center" fontSize="xl" color={c.midnightBlue}>
                            Course plans made easy.
                        </Text>
                    </Flex>

                    <Flex direction="column" align="center" justify="left" mt={8} mr={3}>
                        <Flex direction="column" align="left" justify="space-around" height="100%">
                            <OutlineButton text="Students" to="/students" />
                            <OutlineButton text="Courses" to="/courses" />
                            <OutlineButton text="Programmes" to="/programmes" />
                        </Flex>
                    </Flex>
                    <Flex align="flex-end" justify="center" height="100%">
                        <Image width="80%" objectFit="cover" src="./UoALogo.png" alt="University of Auckland Logo" mb={5} />
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Home;
