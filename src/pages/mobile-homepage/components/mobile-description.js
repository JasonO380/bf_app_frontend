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
                            Build a lean, strong, and mobile body with our
                            specialized training approach.
                        </Text>
                        <Text>
                            1. Develop Mobility: We prioritize mobility work
                            during warm-ups to build a strong foundation,
                            allowing you to move with ease and prevent injuries.
                        </Text>
                        <Text>
                            2. Master the Basics: Our training focuses on
                            mastering fundamental lifts such as the squat,
                            deadlift, pulling, and pressing movements. By
                            building a strong technical foundation, you'll
                            maximize your strength gains and overall
                            performance.
                        </Text>
                        <Text>
                            3. Weight Loss through Metabolic Conditioning: Our
                            high-intensity interval training (HIT) style
                            workouts are designed to elevate your heart rate,
                            boost your metabolism, and burn fat. Get ready to
                            achieve your weight loss goals while building
                            endurance.
                        </Text>
                        <Text>
                            4. Enhance Speed and Power: Experience the benefits
                            of Olympic lifts in our training regimen. By
                            incorporating exercises like clean and jerk and
                            snatch, we help you improve your speed, explosive
                            power, and overall athleticism.
                        </Text>
                        <Text>
                            Join us on the journey to transform your body,
                            improve your performance, and achieve a lean,
                            strong, and mobile physique.
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
