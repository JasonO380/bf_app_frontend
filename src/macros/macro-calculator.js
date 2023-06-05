import React, { useState, useReducer, useContext, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import CalorieAndMacrosOutline from "./calorie-and-macros-outline";
import calculateActivityLevel from "../athletes/calculate-activity-level";
import calculateBMR from "../athletes/calculate-bmr";
import FormComponent from "../shared/form-component";
import DonutTest from "./donut-test";

const MacroCalculator = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [calorieTotal, setCalorieTotal] = useState();
    const inputReducer = (state, action) => {
        console.log("Action:", action);
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
                    gender: "",
                    activitylevel: "",
                };
            default:
                return state;
        }
    };

    const [inputState, dispatch] = useReducer(inputReducer, {
        height: "",
        weight: "",
        age: "",
        gender: "",
        activitylevel: "",
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
        const { weight, height, age, gender, activitylevel } = inputState;
        const bmr = calculateBMR(weight, height, age, gender, activitylevel);
        console.log(bmr);
        const tdee = calculateActivityLevel(bmr, activitylevel);
        console.log("tdee: ", tdee);
        setIsLoading(false);
        setCalorieTotal(tdee)
        console.log(calorieTotal, " total calories")
        dispatch({
            type: "CLEAR_FORM",
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

    const fields = [
        {
            name: "height",
            label: "Height",
            type: "text",
            placeholder: "Enter height in inches",
        },
        {
            name: "weight",
            label: "Weight",
            type: "text",
            placeholder: "Enter weight in KG",
        },
        {
            name: "age",
            label: "Age",
            type: "text",
            placeholder: "Enter age",
        },
        {
            name: "gender",
            label: "Gender",
            type: "text",
            placeholder: "enter gender",
        },
        {
            name: "activitylevel",
            label: "Activity level",
            type: "text",
            placeholder: "enter activity level",
        },
    ];

    return (
        <Box bg="#151414" p={5} height="100%" width="100%" margin="0 auto">
            <FormComponent
                onSubmit={calculateMacros}
                inputState={inputState}
                changeHandler={changeHandler}
                buttonText="Find BMR"
                isLoading={isLoading}
                fields={fields}
                message="Calculating"
                extraButtons={[
                    {
                        text: "Convert weight to KG",
                        onClick: convertKG,
                    },
                ]}
            />
            {calorieTotal && <CalorieAndMacrosOutline calorieTotal={calorieTotal} />}
        </Box>
    );
};

export default MacroCalculator;
