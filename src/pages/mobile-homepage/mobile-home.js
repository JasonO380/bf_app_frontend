import React from "react";
import MainNav from "./components/main-nav";
import MobileIntro from "./components/mobile-intro";
import Description from "../homepage/components/description";
import MobileServices from "../mobile-homepage/components/mobile-services";
import Tracking from "../homepage/components/tracking";
import Footer from "../homepage/components/footer";
import {
    Box,
    Image,
    Flex,
    Button,
    Heading,
    Stack,
    Spacer,
} from "@chakra-ui/react";

const MobileHome = () => {
    return (
        <Box width="100%" bg="#151414">
            <MainNav />
            <MobileIntro />
            <Box mt={100}>
                <Description />
            </Box>
            <MobileServices />
            <Tracking />
            <Footer />
        </Box>
    );
};

export default MobileHome;
