import React, { useState, useReducer, useContext, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import CalorieAndMacrosOutline from "./calorie-and-macros-outline";
import calculateActivityLevel from "../athletes/calculate-activity-level";
import calculateBMR from "../athletes/calculate-bmr";
import FormComponent from "../shared/form-component";
import MacroCalculatorForm from "./macro-calculator-form";

const MacroCalculator = () => {
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
        weight: "",
        age: "",
        sex: "male"
    });

    const changeHandler = (event) => {
        const inputValue = event.target.value;
        const inputName = event.target.name;
        dispatch({
            type: "INPUT_CHANGE",
            name: inputName,
            value: inputValue,
        });
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
