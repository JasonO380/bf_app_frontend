import React from "react";
import {
    Box,
    Image,
    Flex,
    Wrap,
    WrapItem,
    Button,
    Heading,
    Stack,
    Spacer,
    Text,
    List,
    Link,
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
            <Flex
                paddingTop="10px"
                alignItems="center"
                justifyContent="center"
                marginBottom="10px"
                margin="auto"
                width="95%"
                fontSize="xs"
            >
                <Text mr={5} color="white">
                    Contact:
                </Text>
                <Link
                    color="green.500"
                    marginRight="6px"
                    fontSize="25px"
                    href="mailto:JMOllada@gmail.com"
                >
                    <FaEnvelopeSquare />
                </Link>
                <Link
                    color="green.500"
                    fontSize="25px"
                    href="https://www.instagram.com/jasono380"
                >
                    <FaInstagram />
                </Link>
            </Flex>
            <Wrap justify="center" width="95%" margin="auto" fontSize="xs">
                <WrapItem>
                    <List spacing={1} paddingBottom="50px" color="white">
                        <ListItem>
                            <ListIcon as={FaReact} color="green.500" />
                            React
                        </ListItem>
                        <ListItem>
                            <ListIcon as={FaJsSquare} color="green.500" />
                            Express
                        </ListItem>
                        <ListItem>
                            <ListIcon as={FaNodeJs} color="green.500" />
                            Node.JS
                        </ListItem>
                    </List>
                </WrapItem>
                <WrapItem>
                    <List spacing={1} paddingBottom="50px" color="white">
                        <ListItem>
                            <ListIcon as={DiMongodb} color="green.500" />
                            MongoDB
                        </ListItem>
                        <ListItem>
                            <ListIcon as={FaCalendarCheck} color="green.500" />
                            Copyright: {year}
                        </ListItem>
                    </List>
                </WrapItem>
            </Wrap>
        </Box>
    );
};

export default Footer;
