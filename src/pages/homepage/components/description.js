import React, { useState } from "react";
import logo from "../../../images/logo.jpeg";
import me from "../../../images/Intro-me.jpeg";
import { useMediaQuery } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import info from "./description-info";
import {
    Box,
    Image,
    Flex,
    Button,
    Heading,
    Stack,
    Spacer,
} from "@chakra-ui/react";

const Description = () => {
    const [selectedOption, setSelectedOption] = useState(false);
    const [description, setDescription] = useState();
    const clickHandler = (event) => {
        const title = event.target.dataset.name;
        console.log(event.target.dataset.name);
        // info.forEach((section) => {
        //     section.forEach((item) => {
        //         if (item.title === title && Array.isArray(item.description)) {
        //             item.description.forEach((description) => {
        //                 console.log(description);
        //             });
        //         } 
        //     });
        // });
        info.map((section)=>
        section.map((item)=> {
            if(title === "Jason"){
                console.log(item.description)
            }
            if (title === "Training"){
                item.description.map((des)=> {
                    console.log(des)
                })
            }
        }))
    };

    return (
        <Box
            bg="gray.600"
            w="60%"
            mt={-200}
            mx="auto"
            px={8}
            py={6}
            borderRadius="md"
            zIndex={3}
            position="relative"
        >
            <Flex gap={12} mb={4}>
                <Heading
                    as="h2"
                    data-name="Jason"
                    color="white"
                    fontSize="xl"
                    fontWeight="bold"
                    cursor="pointer"
                    onClick={clickHandler}
                >
                    Jason Ollada
                </Heading>
                <Heading
                    as="h2"
                    data-name="Training"
                    color="white"
                    fontSize="xl"
                    fontWeight="bold"
                    cursor="pointer"
                    onClick={clickHandler}
                >
                    Training Method
                </Heading>
            </Flex>
        </Box>
    );
};

export default Description;
