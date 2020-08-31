import React from "react";
import { Flex, Text, Button, Image } from "@chakra-ui/core";
import { Link } from "react-router-dom";

const HomePageButton = ({ text, to }) => {
    return (
        <Link to={to}>
            <Button backgroundColor="#F0F0F0" border="2px solid #122776" rounded="35px" width="320px" height="90px" marginTop="50px">
                <Text textAlign="center" fontSize="2xl" color="#113F73">
                    {text}
                </Text>
            </Button>
        </Link>
    );
};

const HomePage = () => {
    return (
        <Flex height="100vh" width="100%" direction="row">
            <Flex width="75%" backgroundColor="#2A2A2A">
                <Flex width="100%" align="center" justify="center">
                    <Text textAlign="center" fontSize="4xl" color="#FFFFFF">
                        Image from Figma goes here
                    </Text>
                </Flex>
            </Flex>
            <Flex width="25%" backgroundColor="#F0F0F0">
                <Flex width="100%" direction="column" marginTop="60px">
                    <Flex align="center" justify="center">
                        <Image src="https://cdn.auckland.ac.nz/assets/central/central-services/mediaandmarketing/uoa-logos-2015/uoa-logo-2015-reverse.png" />
                    </Flex>

                    <Flex marginTop="30px" align="center" justify="center">
                        <Text textAlign="center" fontSize="4xl" color="#113F73">
                            Course Planner
                        </Text>
                    </Flex>

                    <Flex direction="column" align="center" justify="center">
                        <HomePageButton text="Students" to="/students" />
                        <HomePageButton text="Courses" to="/courses" />
                        <HomePageButton text="Programmes" to="/programmes" />
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default HomePage;
