import React, { useState, useReducer, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Flex, Button } from "@chakra-ui/react";
import CalorieAndMacrosOutline from "./calorie-and-macros-outline";
import calculateActivityLevel from "../athletes/calculate-activity-level";
import calculateBMR from "../athletes/calculate-bmr";
import { LoginRegisterContext } from "../authentication/login-register-context";
import MacroCalculatorForm from "./macro-calculator-form";

const MacroCalculator = () => {
    const navigate = useNavigate();
    const auth = useContext(LoginRegisterContext);
    const isLoggedIn = auth.isLoggedIn;
    const [isLoading, setIsLoading] = useState(false);
    const [calorieTotal, setCalorieTotal] = useState();
    const inputReducer = (state, action) => {
        switch (action.type) {
            case "INPUT_CHANGE":
                return {
                    ...state,
                    [action.name]: action.value,
                };
            case "CLEAR_FORM":
                console.log("form cleared");
                return {
                    height: "",
                    heightFeet:"",
                    heightInches:"",
                    weight: "",
                    age: "",
                    sex: "male"
                };
            default:
                return state;
        }
    };

    const [inputState, dispatch] = useReducer(inputReducer, {
        height: "",
        heightInches:"",
        heightFeet:"",
        weight: "",
        age: "",
        sex: "male"
    });

    const calculateHeight = (height, inches) => {
        if(height === ""){
            height = 0;
        }
        const heightInInches = ((parseInt(height) * 12) + parseInt(inches))
        dispatch({
            type: "INPUT_CHANGE",
            name: "height",
            value: heightInInches,
        });
    }

    const changeHandler = (event) => {
        const inputValue = event.target.value;
        const inputName = event.target.name;
        dispatch({
            type: "INPUT_CHANGE",
            name: inputName,
            value: inputValue,
        });

        if (inputName === 'heightFeet' || inputName === 'heightInches') {
            // Ensure we're always passing numbers to calculateHeight
            const feet = inputName === 'heightFeet' ? (inputValue || 0) : (inputState.heightFeet || 0);
            const inches = inputName === 'heightInches' ? (inputValue || 0) : (inputState.heightInches || 0);
    
            calculateHeight(feet, inches);
        }
    };

    const calculateMacros = (event) => {
        setIsLoading(true);
        event.preventDefault();
        const { weight, height, age, sex, activitylevel } = inputState;
        const bmr = calculateBMR(weight, height, age, sex, activitylevel);
        const tdee = calculateActivityLevel(bmr, activitylevel);
        setIsLoading(false);
        setCalorieTotal(tdee);
        dispatch({
            type: "CLEAR_FORM",
        });
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
            <MacroCalculatorForm
                changeHandler={changeHandler}
                inputState={inputState}
                calculateMacros={calculateMacros}
                toggleSex={toggleSex}
                convertToKG={convertKG}
            />
            {calorieTotal && (
                <CalorieAndMacrosOutline calorieTotal={calorieTotal} />
            )}
        </Box>
    );
};

export default MacroCalculator;
