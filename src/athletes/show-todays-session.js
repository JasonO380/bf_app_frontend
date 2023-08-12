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
            if (!response.ok) {
                const errorData = await response.json();
                console.log(errorData.message);
                throw new Error(errorData.message);
            }
            const responseData = await response.json();
            allSessions = responseData.sessions;
            let todaysSessions = [];
            const date = new Date();
            const month = date.toLocaleString("en-US", { month: "long" });
            const dayOfMonth = date.getDate();
            allSessions.forEach((data) => {
                data.months.forEach((monthObj) => {
                    if (monthObj.month === month) {
                        monthObj.days.forEach((dayObj) => {
                            if (dayObj.day === dayOfMonth) {
                                todaysSessions.push(...dayObj.sessions);
                            }
                        });
                    }
                });
            });
            console.log(todaysSessions)
            // Filter out any month objects where the month is undefined
            // const validSessions = allSessions.filter(monthObj => monthObj.month !== undefined);
            // console.log(allSessions);
            // console.log("Valid sessions are: ", validSessions)
            // const sessionsForToday = allSessions.filter((s) => {
            //     const date = new Date();
            //     const year = date.getFullYear();
            //     const month = date.toLocaleString("en-US", { month: "long" });
            //     const dayOfMonth = date.getDate();
            //     return (
            //         s.year === year &&
            //         s.month === month &&
            //         s.dayOfMonth === dayOfMonth
            //     );
            // });
            setWorkouts(todaysSessions);
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
