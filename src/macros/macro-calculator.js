import React, { useState, useReducer, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Flex,
    Text,
    Button,
    TableContainer,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
} from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import CalorieAndMacrosOutline from "./calorie-and-macros-outline";
import calculateActivityLevel from "../athletes/calculate-activity-level";
import CarbCyclingBeginner from "./carb-cycling-beginner";
import calculateBMR from "../athletes/calculate-bmr";
import { LoginRegisterContext } from "../authentication/login-register-context";
import MacroCalculatorForm from "./macro-calculator-form";

const MacroCalculator = () => {
    const navigate = useNavigate();
    const auth = useContext(LoginRegisterContext);
    const isLoggedIn = auth.isLoggedIn;
    const [calorieTotal, setCalorieTotal] = useState();
    const [cycleType, setCycleType] = useState();
    const inputReducer = (state, action) => {
        switch (action.type) {
            case "INPUT_CHANGE":
                return {
                    ...state,
                    [action.name]: action.value,
                };
            case "CLEAR_FORM":
                return {
                    height: "",
                    heightFeet: "",
                    heightInches: "",
                    weight: "",
                    age: "",
                    sex: "male",
                };
            default:
                return state;
        }
    };

    const [inputState, dispatch] = useReducer(inputReducer, {
        height: "",
        heightInches: "",
        heightFeet: "",
        weight: "",
        age: "",
        sex: "male",
    });

    const calculateHeight = (height, inches) => {
        if (height === "") {
            height = 0;
        }
        const heightInInches = parseInt(height) * 12 + parseInt(inches);
        dispatch({
            type: "INPUT_CHANGE",
            name: "height",
            value: heightInInches,
        });
    };

    const changeHandler = (event) => {
        const inputValue = event.target.value;
        const inputName = event.target.name;
        dispatch({
            type: "INPUT_CHANGE",
            name: inputName,
            value: inputValue,
        });

        if (inputName === "heightFeet" || inputName === "heightInches") {
            // Ensure we're always passing numbers to calculateHeight
            const feet =
                inputName === "heightFeet"
                    ? inputValue || 0
                    : inputState.heightFeet || 0;
            const inches =
                inputName === "heightInches"
                    ? inputValue || 0
                    : inputState.heightInches || 0;

            calculateHeight(feet, inches);
        }
    };

    const calculateMacros = (event) => {
        event.preventDefault();
        console.log(event.target.name);
        const { weight, height, age, sex, activitylevel } = inputState;
        const bmr = calculateBMR(weight, height, age, sex, activitylevel);
        const tdee = calculateActivityLevel(bmr, activitylevel);
        setCalorieTotal(tdee);
        setCycleType(event.target.name);
        dispatch({
            type: "CLEAR_FORM",
        });
    };

    const carbCycleType = (event) => {
        event.preventDefault();
        console.log(event.target.name);
        setCycleType(event.target.name);
    };

    const toggleSex = () => {
        dispatch({
            type: "INPUT_CHANGE",
            name: "sex",
            value: inputState.sex === "male" ? "female" : "male",
        });
    };

    const convertKG = () => {
        const { weight } = inputState;
        const weightInKG = Number(weight) / 2.20462;
        dispatch({
            type: "INPUT_CHANGE",
            name: "weight",
            value: weightInKG.toFixed(2), //Round to 2 decimal places
        });
    };

    return (
        <Box bg="#151414" p={5} minHeight="100vh" width="100%" margin="0 auto">
            <Flex justifyContent="end" marginBottom="20px">
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
            <Box>
                <Text fontSize="xs" color="white" mb="30px">
                    The Macro Calculator is a tool designed to calculate your
                    Basal Metabolic Rate BMR using the Mifflin-St Jeor equation.
                    To use the calculator, simply enter your height in feet and
                    inches, your weight in kilograms, if you have it in pounds
                    you can convert it using the provided button, and select
                    your sex. In addition to providing your BMR, the calculator
                    also offers BMR totals for different activity levels.
                    Furthermore, based on your activity level, it suggests the
                    optimal macronutrient distribution in grams for high,
                    medium, and low carb days. These suggested macros, along
                    with the accompanying blog on carb cycling, can serve as a
                    starting point to help you plan your weekly eating habits
                    effectively. The table below shows the percent used from
                    total calories of each macro used to calculate macro
                    distribution
                </Text>
            </Box>
            <Box mt="30px" mb="30px">
                <Table variant="unstyled" color="white" fontSize="xs" size="xs">
                    <Thead>
                        <Tr>
                            <Th>Day Type</Th>
                            <Th>Protein</Th>
                            <Th>Carbs</Th>
                            <Th>Fat</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>High Carb Day</Td>
                            <Td>30%</Td>
                            <Td>45%</Td>
                            <Td>25%</Td>
                        </Tr>
                        <Tr>
                            <Td>Medium Carb Day</Td>
                            <Td>30%</Td>
                            <Td>30%</Td>
                            <Td>40%</Td>
                        </Tr>
                        <Tr>
                            <Td>Low Carb Day</Td>
                            <Td>30%</Td>
                            <Td>15%</Td>
                            <Td>55%</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </Box>
            <AnimatePresence>
                {!calorieTotal && (
                    <MacroCalculatorForm
                        changeHandler={changeHandler}
                        inputState={inputState}
                        calculateMacros={calculateMacros}
                        toggleSex={toggleSex}
                        convertToKG={convertKG}
                    />
                )}
            </AnimatePresence>
            {calorieTotal && (
                <>
                    <Flex marginBottom="20px">
                        <Button
                            mt={4}
                            name="beginner"
                            border="1px solid white"
                            borderRadius="50px"
                            width="fit-content"
                            onClick={carbCycleType}
                            type="button"
                            bg="transparent"
                            color="white"
                            fontSize="xs"
                        >
                            Beginner cycle
                        </Button>
                        <Button
                            mt={4}
                            name="advanced"
                            border="1px solid white"
                            borderRadius="50px"
                            width="fit-content"
                            onClick={carbCycleType}
                            type="button"
                            bg="transparent"
                            color="white"
                            fontSize="xs"
                        >
                            Advanced cycle
                        </Button>
                    </Flex>
                    <CalorieAndMacrosOutline
                            calorieTotal={calorieTotal}
                            type={cycleType}
                        />
                </>
            )}
        </Box>
    );
};

export default MacroCalculator;
