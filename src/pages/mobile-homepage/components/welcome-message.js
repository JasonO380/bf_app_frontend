import React, { useState, useContext } from "react";
import { Box, Flex, Button, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { LoginRegisterContext } from "../../../authentication/login-register-context";

const WelcomeMessage = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();
    const auth = useContext(LoginRegisterContext);
    const isLoggedIn = auth.isLoggedIn;

    return (
        <Box
            paddingTop="30px"
            paddingBottom="30px"
            height="100%"
            width="100%"
            bg="#151414"
        >
            <Flex justifyContent="end">
                {isLoggedIn && (
                    <Button
                        mt={4}
                        mr={4}
                        onClick={() => navigate("/athlete")}
                        borderRadius="50px"
                        color="white"
                        fontSize="xs"
                        bg="transparent"
                    >
                        Dashboard
                    </Button>
                )}
                <Button
                    mt={4}
                    mr={4}
                    onClick={() => navigate("/")}
                    bg="red"
                    borderRadius="50px"
                    color="white"
                    fontSize="xs"
                >
                    Home
                </Button>
            </Flex>
            <Box width="90%" margin="auto">
                <Heading as="h2" size="lg" mb={4} color="white">
                    Building Lean, Strong, and Mobile Bodies for Life!
                </Heading>
                <Text color="white" fontSize="xs">
                    Thank you for visiting my fitness page. My name is Jason
                    Ollada, and I am the owner of Barbell Factor. I appreciate
                    you taking the time to check out what we have to offer.
                </Text>

                <Text color="white" fontSize="xs">
                    At Barbell Factor, our goal is to provide our clients with
                    the tools and guidance they need to achieve and maintain the
                    leanest, strongest, and most mobile bodies throughout their
                    lives. We believe in focusing on three key pillars that form
                    the foundation of any successful fitness program: diet,
                    exercise selection, and habit building.
                </Text>
                <Text color="white" fontSize="xs">
                    Diet plays a crucial role in achieving your fitness goals,
                    and one effective tool I have discovered over the years is
                    Carb Cycling. To learn more about Carb Cycling and its
                    benefits, you can find detailed information in the "Blogs"
                    section under the drop-down menu.
                </Text>
                <Text color="white" fontSize="xs">
                    When it comes to exercise selection, it is essential to
                    tailor your workouts to address your individual physical
                    needs. By doing so, you can overcome mobility limitations
                    while increasing your strength, power, and overall mobility.
                    Our team at Barbell Factor is dedicated to helping you make
                    the most of your time in the gym by providing personalized
                    exercise programs.
                </Text>
                <Text color="white" fontSize="xs">
                    We also emphasize the importance of looking beyond just the
                    number on the scale. To keep your body functioning optimally
                    throughout your life, we provide a workout tracker that
                    incentivizes strength gains. Additionally, we have included
                    articles on periodization, intensity, and volume, which will
                    help you understand how to use total volume to your
                    advantage. It's not always about surpassing your previous
                    records every day or month; instead, we will guide you on
                    lifting in cycles for long-term progress.
                </Text>
                <Text color="white" fontSize="xs">
                    Lastly, building sustainable fitness habits is key to your
                    success. Your journey towards a healthier lifestyle will
                    involve adopting habits that suit your unique needs and
                    preferences. We encourage you to embrace the process of
                    performance gains and explore which type of carb cycling
                    path resonates with you the most.
                </Text>
                <Text color="white" fontSize="xs">
                    Thank you once again for visiting Barbell Factor. We are
                    here to support you every step of the way in your fitness
                    journey. Feel free to explore our resources, articles, and
                    workout programs to get started on the path to a leaner,
                    stronger, and more mobile body.
                </Text>
            </Box>
        </Box>
    );
};

export default WelcomeMessage;
