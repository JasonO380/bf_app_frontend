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
import DonutChart from "../shared/donut-chart";
import { LoginRegisterContext } from "../authentication/login-register-context";

const GetAndAddTodaysMacros = (props) => {
    const auth = useContext(LoginRegisterContext);
    const [todaysMacros, setTodaysMacros] = useState();
    const [startIndex, setStartIndex] = useState(0);
    const macrosArray = [];
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
            macros.map((m)=> {
                const date = new Date();
                const year = date.getFullYear();
                const month = date.toLocaleString("en-US", { month: "long" });
                const dayOfWeek = date.toLocaleString("default", {
                    weekday: "long",
                });
                if (
                    m.year === year &&
                    m.month === month &&
                    m.dayOfWeek === dayOfWeek
                ) {
                    macrosArray.push(m);
                }
            });
            setAllMacros(macros);
            prepChartData(macros);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchMacros()
    },[auth.userID, auth.token])
};

export default GetAndAddTodaysMacros;