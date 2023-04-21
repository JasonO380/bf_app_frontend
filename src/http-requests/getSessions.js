import { useState, useContext } from "react";
import { LoginRegisterContext } from "../authentication/login-register-context";

const GetSessions = async (type) => {
    const [workouts, setWorkouts] = useState();
    const [allWorkouts, setAllWorkouts] = useState();
    let allSessions;
    const auth = useContext(LoginRegisterContext);
    const user = auth.userID;
    try {
        const response = await fetch(
            `http://localhost:5000/api/users/${user}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Issuer " + auth.token,
                },
            }
        );
        const responseData = await response.json();
        allSessions = responseData.sessions;
        console.log(allSessions);
        const sessions = responseData.sessions.filter((session) => {
            const date = new Date();
            const year = date.getFullYear();
            const month = date.toLocaleString("en-US", { month: "long" });
            const dayOfWeek = date.toLocaleString("default", {
                weekday: "long",
            });
            const dayOfMonth = date.getDate();
            return (
                session.year === year &&
                session.month === month &&
                session.dayOfMonth === dayOfMonth &&
                session.dayOfWeek === dayOfWeek
            );
        });
        setWorkouts(sessions);
        setAllWorkouts(allSessions);
    } catch (err) {}

    return(
        type === "today" ? workouts : allWorkouts
    )


};

export default GetSessions;