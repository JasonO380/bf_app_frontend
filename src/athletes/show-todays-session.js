import React, { useState, useContext, useEffect } from "react";
import { LoginRegisterContext } from "../authentication/login-register-context";
import SessionCard from "../shared/sessions-card";

const ShowTodaysSession = (props) => {
    const newSession = props.newSession;
    const update = props.onUpdate;
    const user = props.user;
    let ses = [];
    let allSessions;
    const auth = useContext(LoginRegisterContext);
    const [workouts, setWorkouts] = useState([]);
    const getSessions = async () => {
        console.log(user);
        try {
            const response = await fetch(
                `https://bf-backend.onrender.com/api/users/${user}`,
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
            const sessionsForToday = allSessions.filter((s) => {
                const date = new Date();
                const year = date.getFullYear();
                const month = date.toLocaleString("en-US", { month: "long" });
                const dayOfMonth = date.getDate();
                return (
                    s.year === year &&
                    s.month === month &&
                    s.dayOfMonth === dayOfMonth
                );
            });
            setWorkouts(sessionsForToday);
        } catch (err) {}
    };

    const handleUpdate = () => {
        getSessions();
    };

    useEffect(() => {
        getSessions();
        console.log(auth.userID);
    }, [user, newSession]);

    return (
        workouts.length > 0 && (
            <SessionCard
                setUpdate={props.setUpdate}
                workouts={workouts}
                getUpdate={getSessions}
                onDelete={getSessions}
                update={props.update}
            />
        )
    );
};

export default ShowTodaysSession;
