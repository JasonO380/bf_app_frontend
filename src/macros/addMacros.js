import React, { useContext, useReducer, useState } from "react";
import {
    Box,
    Image,
    Flex,
    Button,
    Stack,
    FormControl,
    FormLabel,
    Input,
} from "@chakra-ui/react";
import MacrosForm from "./MacrosForm";
import { LoginRegisterContext } from "../authentication/login-register-context";

const AddMacros = () => {
    const auth = useContext(LoginRegisterContext);
    console.log(auth);
    const [newMacros, setNewMacros] = useState();
    const inputReducer = (state, action) => {
        const dateEntry = new Date();
        switch (action.type) {
            case "INPUT_CHANGE":
                return {
                    ...state,
                    [action.name]: action.value,
                    year: dateEntry.getFullYear(),
                    dayOfWeek: dateEntry.toLocaleString("default", {
                        weekday: "long",
                    }),
                    dayOfMonth: dateEntry.getDate(),
                    month: dateEntry.toLocaleString("en-US", { month: "long" }),
                };
            case "CLEAR_FORM":
                console.log("form cleared");
                return {
                    carbs: "",
                    protein: "",
                    fats: "",
                };
            default:
                return state;
        }
    };

    const fields = [
        {
            name: "carbs",
            label: "Carbs",
            dataKey: "macros",
        },
        {
            name: "protein",
            label: "Protein",
            dataKey: "macros",
        },
        {
            name: "fats",
            label: "Fats",
            dataKey: "macros",
        },
    ];

    const [inputState, dispatch] = useReducer(inputReducer, {
        protein: "",
        carbs: "",
        fats: "",
        athlete: "",
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

    const postMacros = async (event) => {
        const userID = auth.userID;
        event.preventDefault();
        try {
            const response = await fetch(
                `https://bf-backend.onrender.com/api/macros/${userID}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Issuer " + auth.token,
                    },
                    body: JSON.stringify({
                        carbs: inputState.carbs,
                        protein: inputState.protein,
                        fats: inputState.fats,
                        year: inputState.year,
                        month: inputState.month,
                        dayOfMonth: inputState.dayOfMonth,
                        dayOfWeek: inputState.dayOfWeek,
                        athlete: userID,
                    }),
                }
            );
            const responseData = await response.json();
            dispatch({
                type: "CLEAR_FORM",
            });
            console.log(responseData.macros);
            setNewMacros(responseData.macros);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <MacrosForm
            onSubmit={postMacros}
            inputState={inputState}
            fields={fields}
            changeHandler={changeHandler}
            buttonText="Add macros"
        />
    );
};

export default AddMacros;
