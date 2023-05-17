import React, { useState, useEffect, useContext} from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Box, Text } from "@chakra-ui/react";
import { LoginRegisterContext } from "../../../authentication/login-register-context";
import BarChart from "../../../shared/bar-chart";

const WeeklyWorkoutTotal = () => {
    const auth = useContext(LoginRegisterContext);
    const [count, setCount] = useState([]);
    const uniqueMonth = [];

    const getWorkoutData = async () => {
        const id = auth.userID;
        try {
            const response = await fetch(
                `https://bf-backend.onrender.com/api/users/${id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Issuer " + auth.token,
                    },
                }
            );
            const responseData = await response.json();
            const workoutData = responseData.sessions;
            prepChartData(workoutData);
        } catch (err) {
            console.log(err)
        }
    };

    const prepChartData = (workoutData) => {
        let monthObj = [];
        let doubles = [];
        const uniqueDays = [];
        workoutData.map((s)=> {
            const month = s.month;
            const day = s.dayOfMonth;
            if(!doubles.includes(month)){
                doubles.push(month);
                monthObj = { month, daysLifted: [] };
                if (!monthObj.daysLifted.includes(day)) {
                    monthObj.daysLifted.push(day);
                }
                uniqueMonth.push(monthObj);
            } else {
                const index = uniqueMonth.findIndex((obj) => obj.month === month);
                if (!uniqueMonth[index].daysLifted.includes(day)) {
                    uniqueMonth[index].daysLifted.push(day);
                }
            }
        })
        console.log(uniqueMonth);
        //Set the count state variable to an array of objects containing month and count properties
        const liftedDaysCount = uniqueMonth.map((m) => ({
            month: m.month,
            count: m.daysLifted.length,
            }));
            setCount(liftedDaysCount);
    }

    useEffect(() => {
        getWorkoutData();
    }, [auth.userID, auth.token]);

    if(count){
        return (
            <Box color="white" paddingBottom="60px">
                <BarChart
                data={count}
                options={{ maintainAspectRatio: false }}
            />
            </Box>
        )
    }
}

export default WeeklyWorkoutTotal;