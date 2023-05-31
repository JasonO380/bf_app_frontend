import React from "react";
import { Box, Image } from "@chakra-ui/react";
import LoadingSpinner from "./loading-spinner";
import logo from "../images/logo.jpeg";

const SplashPage = (props) => {
    const text = props.text;
    return (
        <Box
            bg="linear-gradient(to bottom, #3D0149, #00BCD4)"
            height="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Box textAlign="center">
                <Image
                    borderRadius="100%"
                    height="15rem"
                    src={logo}
                    marginBottom="15px"
                />
                <LoadingSpinner text={text} />
            </Box>
        </Box>
    );
};

export default SplashPage;
