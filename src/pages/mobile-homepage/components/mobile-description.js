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
                            and encouraging environment. The goal is to keep you engaged with training
                            by focusing on performance to keep you moving efficiently throughout your life span.
                        </Text>
                    </TabPanel>
                    <TabPanel>
                        <Text>
                            1. Develop Mobility: Set yourself up for succes by prioritzing a
                            proper warm up that will optimize performance
                        </Text>
                        <Text>
                            2. Master the Basics: Mastering fundamental lifts such as the squat,
                            deadlift, pulling, and pressing movements.
                        </Text>
                        <Text>
                            3. Metabolic Conditioning: High-intensity interval 
                            training to elevate your heart rate and boost metabolism
                        </Text>
                        <Text>
                            4. Enhance Speed and Power: Learn the clean and jerk and snatch 
                            to increase athleticism.
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
