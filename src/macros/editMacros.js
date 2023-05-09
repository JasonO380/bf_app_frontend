import React, { useState, useReducer, useEffect, useContext } from "react";
import { LoginRegisterContext } from "../authentication/login-register-context";
import FormComponent from "../shared/form-component";
import { Box, Text, Heading } from "@chakra-ui/react";

const EditMacros = () => {
    const auth = useContext(LoginRegisterContext);
    const [allMacros, setAllMacros] = useState();
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
    const [inputState, dispatch] = useReducer(inputReducer, {
        protein: "",
        carbs: "",
        fats: "",
        athlete: "",
    });

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

    const fetchMacros = async () => {
        const userID = auth.userID;
        let macros;
        // const macrosArray = [];
        try {
            const response = await fetch(
                `http://localhost:5000/api/macros/${userID}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Issuer " + auth.token,
                    },
                }
            );
            const responseData = await response.json();
            macros = responseData.macros.reverse();
            console.log(macros);
            setAllMacros(macros);
            console.log(allMacros);
        } catch (err) {
            console.log(err);
        }
    };

    const editMacros = async () => {
        const user = auth.userID;
        try {
            const response = await fetch(
                `http://localhost:5000/api/macros/${user}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Issuer " + auth.token,
                    },
                    body: JSON.stringify(),
                }
            );
            const responseData = await response.json();
            console.log(responseData.macros);
            setAllMacros(responseData.macros);
        } catch (err) {
            console.log(err);
        }
    };

    const changeHandler = (event) => {
        const inputValue = event.target.value;
        const inputName = event.target.name;
        dispatch({
            type: "INPUT_CHANGE",
            name: inputName,
            value: inputValue,
        });
    };

    const getMonthAndYear = (date) => {
        const dateEntry = new Date(date);
        const month = dateEntry.toLocaleString("en-US", { month: "long" });
        const year = dateEntry.getFullYear();
        return { month, year };
    };

    const getDayOfMonth = (date) => {
        const dateEntry = new Date(date);
        return dateEntry.getDate();
    };

    useEffect(() => {
        fetchMacros();
    }, [auth.userID, auth.token]);

    if (allMacros) {
        const renderedMonths = new Set();
        return (
            <Box>
                {allMacros.map((macros) => {
                    const { month, year } = macros;
                    const monthYearKey = `${month}-${year}`;
                    const isNewMonth = !renderedMonths.has(monthYearKey);
                    if (isNewMonth) {
                        renderedMonths.add(monthYearKey);
                    }
                    return (
                        <Box key={macros._id}>
                            {isNewMonth && (
                                <Heading color="white">
                                    {month}
                                </Heading>
                            )}
                            <Text color="white">{macros.dayOfMonth}</Text>
                            <FormComponent
                                onSubmit={editMacros}
                                inputState={inputState}
                                fields={fields}
                                changeHandler={changeHandler}
                                allData={{ macros }}
                                buttonText="Edit macros"
                            />
                        </Box>
                    );
                })}
            </Box>
        );
    }
};

export default EditMacros;
