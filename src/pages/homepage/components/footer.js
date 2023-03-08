import React from "react";
import {
    Box,
    Image,
    Flex,
    Button,
    Heading,
    Stack,
    Spacer,
    Text,
    List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList,
} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { FaJsSquare } from "react-icons/fa";
import { FaNodeJs } from "react-icons/fa";
import { DiMongodb } from "react-icons/di";
import { FaCalendarCheck } from "react-icons/fa";
import { FaEnvelopeSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();
    return (
        <Box width="100%" bg="gray.600">
            <Flex paddingTop="10px" margin="auto" width="95%">
                <Text mr={5} color="white">
                    Contact Info
                </Text>
                <a
                    style={{
                        color: "white",
                        marginRight: "6px",
                        fontSize: "35px",
                    }}
                    href="mailto:JMOllada@gmail.com"
                >
                    <FaEnvelopeSquare />
                </a>
                <a
                    style={{ color: "white", fontSize: "35px" }}
                    href="https://www.instagram.com/jasono380"
                >
                    <FaInstagram />
                </a>
            </Flex>
            <Stack alignItems="center" width="95%" margin="auto">
                <List spacing={1} paddingBottom="50px">
                    <ListItem color="white">
                        <ListIcon as={FaReact} color="green.500" />
                        React
                    </ListItem>
                    <ListItem color="white">
                        <ListIcon as={FaJsSquare} color="green.500" />
                        Express
                    </ListItem>
                    <ListItem color="white">
                        <ListIcon as={FaNodeJs} color="green.500" />
                        Node.JS
                    </ListItem>
                    <ListItem color="white">
                        <ListIcon as={DiMongodb} color="green.500" />
                        MongoDB
                    </ListItem>
                    <ListItem color="white">
                        <ListIcon as={FaCalendarCheck} color="green.500" />
                        Copyright: {year}
                    </ListItem>
                </List>
            </Stack>
        </Box>
    );
};

export default Footer;
