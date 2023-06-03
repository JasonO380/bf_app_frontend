import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Heading,
    Flex,
    Button,
    Text,
    UnorderedList,
    ListItem,
} from "@chakra-ui/react";
import { LoginRegisterContext } from "../authentication/login-register-context";

const SuccessMindset = () => {
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
                    Success Mindset
                </Heading>
                <Text color="white" fontSize="xs">
                    Much like you should never stop learning you should never
                    stop being active and fit. Being active and fit is what will
                    give you the freedom to move about and do your daily
                    routines throughout your life span. Being active and fit is
                    not just a short-term goal; it's a lifelong commitment that
                    grants you the freedom to move about and engage in your
                    daily routines throughout your entire life span.
                </Text>
                <UnorderedList color="white" fontSize="xs" mt={2} pl={4}>
                    <ListItem>
                        <strong>
                            1 Fuel Your Body for Optimal Performance:
                        </strong>{" "}
                        It's crucial to view food as fuel that powers your body
                        towards your desired outcomes. Embrace the idea that the
                        foods you consume play a significant role in your
                        performance and overall well-being. Instead of
                        categorizing foods as "good" or "bad," consider how each
                        choice can either contribute to or hinder your progress.
                        It is also important to plan out cheat days or meals
                        accordingly. Cheat meals/days can be a great way to
                        boost calorie consumption and refuel the body for
                        optimal performance as well as a mental break. I have
                        provided info on carb cycling so you can better set up a
                        weekly eating plan to follow
                    </ListItem>
                    <ListItem>
                        <strong>2 Focus on what matters:</strong> Shift your
                        mindset from solely focusing on aesthetics to
                        prioritizing athletic performance. Instead of fixating
                        on how your body looks, concentrate on what it can
                        achieve. Set goals related to strength, speed,
                        endurance, flexibility and work consistently to improve
                        in those areas. As you witness your abilities grow,
                        you'll develop a deeper appreciation for the power of
                        your body and the incredible progress you're making.
                        Focus on the journey and all the results will come
                    </ListItem>
                    <ListItem>
                        <strong>3 Accountability Breeds Success:</strong>{" "}
                        Accountability is a powerful tool when cultivating a
                        success-oriented mindset. Set clear and measurable goals
                        for your fitness journey and hold yourself accountable
                        for achieving them. I have provided a workout and macro
                        tracker for you to regularly track your progress. When
                        you take responsibility for your actions and choices,
                        you empower yourself to stay focused, motivated, and on
                        track towards your fitness aspirations.
                    </ListItem>
                    <ListItem>
                        <strong>Celebrate Every Victory</strong> Along the path
                        to fitness success, it's crucial to acknowledge and
                        celebrate the small wins. Recognize and appreciate the
                        positive habits you build along the way, whether it's
                        having your macros closer to your targets, completing
                        more workouts this month than last, or your mobility is
                        increasing. Each step forward, no matter how small, is a
                        testament to your dedication and progress. Celebrating
                        these achievements boosts your confidence and fuels your
                        motivation to keep pushing forward.
                    </ListItem>
                </UnorderedList>
                <Text color="white" fontSize="xs" mt={4}>
                    The beauty of fitness is that it is never too late to start.
                    No matter your age or current fitness level, taking that
                    first step towards an active lifestyle can have profound
                    effects on your overall well-being. Embrace the mindset that
                    being active and fit is a lifelong commitment, a journey
                    that evolves with you. Set realistic goals, listen to your
                    body, and find activities that bring you joy and
                    fulfillment. Remember, your fitness journey is not just
                    about a number on a scale or a specific aesthetic goal. It's
                    about the freedom to experience life to the fullest, to
                    savor every moment, and to engage in the activities that
                    bring you happiness. So, make the commitment to prioritize
                    your physical well-being, and let the journey towards a
                    lifetime of active living begin
                </Text>
            </Box>
        </Box>
    );
};

export default SuccessMindset;
