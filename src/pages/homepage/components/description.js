import React, { useState } from "react";
import { useMediaQuery } from "@chakra-ui/react";
import { motion } from "framer-motion";
import info from "./description-info";
import {
    Box,
    Text,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
} from "@chakra-ui/react";

const Description = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [description, setDescription] = useState([]);
    const [activeHeading, setActiveHeading] = useState();
    const [isTabletOrAbove] = useMediaQuery("(min-width: 600px)");
    let data = [];
    let active;
    const clickHandler = (event) => {
        setDescription([]);
        const title = event.target.dataset.name;
        console.log(event.target.dataset.name);
        // setActiveHeading(title);
        const item = info[0].find((item) => item.title === title);
        if(activeHeading === title){
            console.log('here')
            setIsClicked(!isClicked)
            console.log(isClicked);
        } else {
            setActiveHeading(title)
            console.log("poop pants")
        }
        if (title === "Jason") {
            item.description.map((info) => {
                data = [];
                data.push(info);
                console.log(data);
            });
            setDescription(data);
            setIsClicked(true);
            console.log(isClicked);
        }

        if (title === "Training") {
            active = title;
            item.description.map((info) => {
                data.push(info);
                console.log(data);
            });
            setDescription(data);
            setIsClicked(true);
            console.log(active)
        }
    };

    return (
        <Box
            bg="gray.600"
            w="100%"
            mx="auto"
            borderRadius={isTabletOrAbove && "20px"}
            zIndex={3}
            position="relative"
        >
            <Tabs onClick={clickHandler} variant="enclosed">
                <TabList>
                    <Tab
                        as="h2"
                        data-name="Jason"
                        color="white"
                        fontSize="xl"
                        fontWeight="bold"
                    >
                        Jason Ollada
                    </Tab>
                    <Tab
                        as="h2"
                        data-name="Training"
                        color="white"
                        fontSize="xl"
                        fontWeight="bold"
                    >
                        Training
                    </Tab>
                </TabList>
                {isClicked &&
                    description.map((info, index) => {
                        return (
                            <TabPanels
                                as={motion.div}
                                key={index}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                transition={{ duration: 0.5 }}
                            >
                                <TabPanel>
                                    <Text
                                        fontSize="xs"
                                        key={index}
                                        color="white"
                                    >
                                        {info}
                                    </Text>
                                </TabPanel>
                                <TabPanel>
                                    <Text
                                        fontSize="xs"
                                        key={index}
                                        color="white"
                                    >
                                        {info}
                                    </Text>
                                </TabPanel>
                            </TabPanels>
                        );
                    })}
            </Tabs>
        </Box>
    );
};

export default Description;
