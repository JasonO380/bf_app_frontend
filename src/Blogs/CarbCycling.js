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

const CarbCycling = () => {
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
                    Carb Cycling
                </Heading>
                <Text color="white" fontSize="xs">
                    Carb cycling is a dietary strategy that involves alternating
                    between high-carb, medium-carb, and low-carb days in a
                    cyclical manner. It is often used by athletes, bodybuilders,
                    and individuals seeking to optimize their body composition.
                </Text>
                <Text color="white" fontSize="xs" mt={4}>
                    The specific percentages of protein, carbs, and fats for
                    each day of a carb cycle can vary depending on individual
                    goals, preferences, and activity levels. However, I can
                    provide you with a general guideline that is commonly
                    followed:
                </Text>
                <UnorderedList color="white" fontSize="xs" mt={2} pl={4}>
                    <ListItem>
                        <strong>High-Carb Days:</strong> On high-carb days,
                        carbohydrates are consumed in higher amounts to
                        replenish glycogen stores and provide energy. The
                        macronutrient distribution for high-carb days is
                        typically around 40-60% of total calories from
                        carbohydrates, 25-35% from protein, and 15-25% from
                        fats.
                    </ListItem>
                    <ListItem>
                        <strong>Medium-Carb Days:</strong> Medium-carb days
                        involve a moderate intake of carbohydrates. The
                        macronutrient distribution for medium-carb days is
                        usually around 30-40% of total calories from
                        carbohydrates, 30-40% from protein, and 20-30% from
                        fats.
                    </ListItem>
                    <ListItem>
                        <strong>Low-Carb Days:</strong> On low-carb days,
                        carbohydrate intake is restricted to promote fat burning
                        and enhance insulin sensitivity. The macronutrient
                        distribution for low-carb days is commonly around 10-20%
                        of total calories from carbohydrates, 40-50% from
                        protein, and 30-40% from fats.
                    </ListItem>
                </UnorderedList>
                <Text color="white" fontSize="xs" mt={4}>
                    The duration and structure of a carb cycling cycle can vary
                    depending on individual preferences and goals. Some common
                    cycles include:
                </Text>
                <UnorderedList mt={2} pl={4} color="white" fontSize="xs">
                    <ListItem>
                        <strong>Weekly Cycle:</strong> This involves a 7-day
                        cycle where you have 4 low-carb days, 2 medium-carb
                        days, and 1 high-carb day.
                    </ListItem>
                    <ListItem>
                        <strong>Alternating Cycle:</strong> In this cycle, you
                        alternate between low-carb and high-carb days every
                        other day. For example, you would have a low-carb day
                        followed by a high-carb day, then repeat the pattern.
                    </ListItem>
                    <ListItem>
                        <strong>Targeted Cycle:</strong> This cycle involves
                        having low-carb days during periods of lower physical
                        activity or rest days and high-carb days on days when
                        you engage in intense workouts or physical activity.
                    </ListItem>
                </UnorderedList>
            </Box>
        </Box>
    );
};

export default CarbCycling;
