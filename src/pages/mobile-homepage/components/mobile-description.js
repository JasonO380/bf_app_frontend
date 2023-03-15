import React, { useState, useEffect } from "react";
import { useMediaQuery } from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
    Box,
    Text,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
} from "@chakra-ui/react";

const MobileDescription = () => {
    return (
        <Box bg="gray.600" w="100%" mx="auto" zIndex={3} position="absolute">
            <Tabs color="white">
                <TabList>
                    <Tab>Jason Ollada</Tab>
                    <Tab>Training</Tab>
                    <Tab>Location</Tab>
                </TabList>
                <TabPanels fontSize="xs">
                    <TabPanel>
                        <Text>
                            With over ten years of experience as a strength and
                            conditoning coach I have created programs for my
                            clients to thrive and see lasting results. Using
                            mindful training I tailor programs for each
                            individuals specific needs while creating a positive
                            and encouraging environment
                        </Text>
                    </TabPanel>
                    <TabPanel>
                        <Text>
                            Build a strong base through mobility work during
                            warm ups
                        </Text>
                        <Text>
                            Build a strong technical foundation with the basic
                            lifts SQUAT DEADLIFT PULLING and PRESSING movements
                        </Text>
                        <Text>
                            Metabolic conditioning achieved by executing higher
                            rep HIT style training for weight loss
                        </Text>
                        <Text>
                            Speed and power are increased with execution of the
                            olympic lifts
                        </Text>
                    </TabPanel>
                    <TabPanel>
                        <Text>Located in West Town Chicago</Text>
                        <Text>
                            Email for info on how to get started or upgrade your
                            current fitness journey
                        </Text>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default MobileDescription;
