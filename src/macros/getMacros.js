import React, { useContext, useEffect, useState } from "react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
    Box,
    Text,
    Image,
    Flex,
    IconButton,
    Button,
    Stack,
    Spacer,
} from "@chakra-ui/react";
import MacroDonutChart from "./macro-donut-chart";
import DonutChart from "../shared/donut-chart";
import { LoginRegisterContext } from "../authentication/login-register-context";

const GetMacros = () => {
    const [todaysMacros, setTodaysMacros] = useState();
    const [allMacros, setAllMacros] = useState();
    const [cData, setCData] = useState();
    const [cOptions, setCOptions] = useState();
    const [startIndex, setStartIndex] = useState(0);
    const auth = useContext(LoginRegisterContext);
    let macros;

    const fetchMacros = async () => {
        const userID = auth.userID;

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
            prepChartData(macros);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchMacros();
    }, []);

    useEffect(() => {
        console.log(allMacros);
    }, [allMacros]);

    const prepChartData = (macroData) => {
        const chartData = macroData.map((m) => {
            return {
                carbs: m.carbs,
                protein: m.protein,
                fats: m.fats,
                month: m.month,
                dayOfMonth: m.dayOfMonth,
            };
        });

        const data = chartData.map((macro) => ({
            labels: [
                "Carbs " + " " + macro.carbs,
                "Protein" + " " + macro.protein,
                "Fats" + " " + macro.protein,
            ],
            datasets: [
                {
                    data: [macro.carbs, macro.protein, macro.fats],
                    backgroundColor: ["#257ff5", "#F06B2D", "#f8df00"],
                },
            ],
        }));

        const options = chartData.map((macro) => ({
            plugins: {
                legend: {
                    position: "top",
                },
                title: {
                    display: true,
                    text: `${macro.month}, ${macro.dayOfMonth}`,
                    font: {
                        size: "30",
                        // weight: "bold",
                        family: "Montserrat",
                    },
                },
            },
        }));

        console.log(allMacros);
        setCData(data);
        setCOptions(options);
        console.log(cData);
    };

    const handleNextClick = () => {
        if (canMoveNext) {
            setStartIndex(startIndex + 2);
        }
    };

    const handlePrevClick = () => {
        if (canMovePrev) {
            setStartIndex(startIndex - 2);
        }
    };

    const canMoveNext = startIndex + 2 < allMacros?.length;
    const canMovePrev = startIndex > 0;

    if (cData) {
        return (
            <MacroDonutChart
            cData={cData}
            cOptions={cOptions}
            startIndex={startIndex}
            canMovePrev={canMovePrev}
            canMoveNext={canMoveNext}
            handlePrevClick={handlePrevClick}
            handleNextClick={handleNextClick} />
        );
    }
};

export default GetMacros;
