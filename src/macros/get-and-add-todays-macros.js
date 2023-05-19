import React, { useContext, useEffect, useState, useReducer } from "react";
import {
    Box,
    Button,
} from "@chakra-ui/react";
import FormComponent from "../shared/form-component";
import DonutChart from "../shared/donut-chart";
import { LoginRegisterContext } from "../authentication/login-register-context";

const GetAndAddTodaysMacros = (props) => {
    const auth = useContext(LoginRegisterContext);
    const [todaysMacros, setTodaysMacros] = useState();
    const [cData, setCData] = useState();
    const [cOptions, setCOptions] = useState();
    const [isLoading, setIsLoading] = useState(false);
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
            placeholder: "Carbs",
        },
        {
            name: "protein",
            label: "Protein",
            placeholder: "Protein",
        },
        {
            name: "fats",
            label: "Fats",
            placeholder: "Fats",
        },
    ];

    const fetchMacros = async () => {
        const userID = auth.userID;
        let macros;
        try {
            const response = await fetch(
                `https://bf-backend.onrender.com/api/macros/${userID}`,
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
            const date = new Date();
            const year = date.getFullYear();
            const month = date.toLocaleString("en-US", { month: "long" });
            const dayOfWeek = date.toLocaleString("default", {
                weekday: "long",
            });

            const currentMacros = macros.find(
                (m) =>
                    m.year === year &&
                    m.month === month &&
                    m.dayOfWeek === dayOfWeek
            );
            setTodaysMacros(currentMacros);
            prepChartData(currentMacros);
            console.log(todaysMacros);
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

    const postMacros = async (event) => {
        setIsLoading(true);
        const userID = auth.userID;
        event.preventDefault();
        try {
            if (todaysMacros) {
                // Update existing macros
                const updatedMacros = {
                    carbs:
                        parseInt(todaysMacros.carbs) +
                        parseInt(inputState.carbs),
                    protein:
                        parseInt(todaysMacros.protein) +
                        parseInt(inputState.protein),
                    fats:
                        parseInt(todaysMacros.fats) + parseInt(inputState.fats),
                };

                const response = await fetch(
                    `https://bf-backend.onrender.com/api/macros/${todaysMacros._id}`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Issuer " + auth.token,
                        },
                        body: JSON.stringify(updatedMacros),
                    }
                );
                const responseData = await response.json();
                console.log(responseData.macros);
                setTodaysMacros(responseData.macros);
            } else {
                // Create new macros
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
                console.log(responseData.macros);
                setTodaysMacros(responseData.macros);
                prepChartData(responseData.macros);
            }
            dispatch({ type: "CLEAR_FORM" });
        } catch (err) {
            console.log(err);
        }
        setIsLoading(false);
    };

    const deleteMacros = async (event) => {
        setIsLoading(true);
        const mid = event.target.name;
        try {
            const response = await fetch(
                `https://bf-backend.onrender.com/api/macros/${mid}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Issuer " + auth.token,
                    },
                }
            );
            const responseData = await response.json();
            console.log(responseData.message);
        } catch (err) {}
        fetchMacros();
        setIsLoading(false);
    };

    const prepChartData = (macroData) => {
        const chartData = {
            carbs: macroData.carbs,
            protein: macroData.protein,
            fats: macroData.fats,
            month: macroData.month,
            dayOfMonth: macroData.dayOfMonth,
        };
        const data = {
            labels: [
                "Carbs" + " " + chartData.carbs,
                "Protein" + " " + chartData.protein,
                "Fats" + " " + chartData.fats,
            ],
            datasets: [
                {
                    data: [chartData.carbs, chartData.protein, chartData.fats],
                    backgroundColor: ["#257ff5", "#F06B2D", "#f8df00"],
                },
            ],
        };
        const options = {
            plugins: {
                legend: {
                    position: "top",
                },
                title: {
                    display: true,
                    text: `${chartData.month}, ${chartData.dayOfMonth}`,
                    font: {
                        size: "30",
                        family: "Montserrat",
                    },
                },
            },
        };
        setCData(data);
        setCOptions(options);
        console.log(cData);
    };

    useEffect(() => {
        fetchMacros();
    }, [auth.userID, auth.token, todaysMacros]);

    return (
        <React.Fragment>
            <FormComponent
                onSubmit={postMacros}
                inputState={inputState}
                changeHandler={changeHandler}
                fields={fields}
                isLoading={isLoading}
                buttonText="Add macros"
            />
            {todaysMacros && (
                <Box paddingBottom="60px" height="15rem" display="flex" justifyContent="center" alignItems="baseline">
                    <DonutChart data={cData} options={cOptions} />
                    <Button
                        name={todaysMacros._id}
                        color="white"
                        borderRadius="50px"
                        backgroundColor="red"
                        onClick={deleteMacros}
                        fontSize="xs"
                    >
                        Delete
                    </Button>
                </Box>
            )}
        </React.Fragment>
    );
};

export default GetAndAddTodaysMacros;
