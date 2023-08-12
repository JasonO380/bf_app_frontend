import React, { useState, useEffect, useContext } from "react";
import { Box } from "@chakra-ui/react";
import { LoginRegisterContext } from "../../../authentication/login-register-context";
import BarChart from "../../../shared/bar-chart";

const MonthlyWorkoutTotal = () => {
    const auth = useContext(LoginRegisterContext);
    const [count, setCount] = useState([]);
    let lastFiveMonths = [];

    const getWorkoutData = async () => {
        const id = auth.userID;
        try {
            const response = await fetch(
                // `http://localhost:5000/api/users/${id}`, keep here for testing purposes
                `https://bf-backend.onrender.com/api/users/${id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Issuer " + auth.token,
                    },
                }
            );
            if (!response.ok) {
                const errorResponse = await response.json();
                console.log(errorResponse.message);
                throw new Error(errorResponse.message);
            }
            const responseData = await response.json();
            const workoutData = responseData.sessions;
            console.log(workoutData);
            prepareChartData(workoutData);
        } catch (err) {
            console.log(err);
        }
    };

    const prepareChartData = (workoutData) => {
        // Flatten the data structure to get an array of month objects
        const allMonths = workoutData.flatMap((item) => item.months);
        // Filter out any month objects where the month is undefined
        const validMonths = allMonths.filter(monthObj => monthObj.month !== undefined);
        lastFiveMonths = validMonths.splice(-5)
        // Map over all month objects to get the count of days lifted for each month
        const daysLiftedCounts = lastFiveMonths.map((monthObj) => ({
            month: monthObj.month,
            count: monthObj.days.length,
        }));

        console.log(daysLiftedCounts)
        setCount(daysLiftedCounts)
    };

    useEffect(() => {
        getWorkoutData();
    }, [auth.userID, auth.token]);

    if (count) {
        return (
            <Box color="white" paddingBottom="60px">
                <BarChart
                    data={count}
                    options={{ maintainAspectRatio: false }}
                />
            </Box>
        );
    }
};

export default MonthlyWorkoutTotal;
