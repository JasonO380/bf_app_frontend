import React, { useState, useContext, useEffect } from "react";
import { LoginRegisterContext } from "../authentication/login-register-context";
import SessionCard from "../shared/sessions-card";

const ShowTodaysSession = ({user, workouts}) => {
    console.log("ShowTodaysSession rendered", workouts);
    console.log("Show todays session: ", user)
    let allSessions;
    let todaysSessions = [];
    const auth = useContext(LoginRegisterContext);
    const [newWorkouts, setNewWorkouts] = useState([]);
    const [sessionsLoaded, setSessionsLoaded] = useState(false)
    const getSessions = async () => {
        // console.log(user);
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
            // Filter sessions
            const validSessions = allSessions.filter((session) => {
                return session.months.every((month) => {
                    return month.month; // month name exists
                });
            });
            todaysSessions = [];
            const date = new Date();
            const month = date.toLocaleString("en-US", { month: "long" });
            const dayOfMonth = date.getDate();
            validSessions.forEach((data) => {
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
            console.log(todaysSessions);
            setNewWorkouts(prevWorkouts => todaysSessions);
            setSessionsLoaded(true)
            // newSession(false);
        } catch (err) {}
    };

    return (
        (
            <SessionCard
                // setUpdate={props.setUpdate}
                workouts={workouts}
                getUpdate={getSessions}
                onDelete={getSessions}
                // update={props.update}
            />
        )
    );
};

export default React.memo(ShowTodaysSession);
