import React, { useState, useContext, useEffect } from "react";
import { LoginRegisterContext } from "../authentication/login-register-context";
import SessionCard from "../shared/sessions-card";

const ShowTodaysSession = (props) => {
    const newSession = props.newSession
    const user = props.user;
    let ses = [];
    let allSessions;
    const auth = useContext(LoginRegisterContext);
    const [workouts, setWorkouts] = useState([]);
    const getSessions = async () => {
        console.log(user);
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
            allSessions = responseData.sessions.reverse();
            console.log(allSessions);
            allSessions.map((s) => {
                const date = new Date();
                const year = date.getFullYear();
                const month = date.toLocaleString("en-US", { month: "long" });
                const dayOfWeek = date.toLocaleString("default", {
                    weekday: "long",
                });
                const dayOfMonth = date.getDate()
                if (
                    s.year === year &&
                    s.month === month &&
                    s.dayOfMonth === dayOfMonth
                ) {
                    ses.push(s);
                }
            });
            setWorkouts(ses);
        } catch (err) {}
    };

    useEffect(() => {
        getSessions();
        console.log(auth.userID);
    }, [user, newSession]);

    return (workouts && <SessionCard workouts={workouts} onDelete={getSessions} />)
};

export default ShowTodaysSession;