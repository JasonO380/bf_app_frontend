import React, { useContext, useState, useEffect } from "react";
import SessionCard from "../shared/sessions-card";
import ShowWorkoutsByWeek from "./show-workouts-by-week";
import { LoginRegisterContext } from "../authentication/login-register-context";

const ShowAthleteSessionsHistory = (props) => {
    const user = props.user;
    const showEditWorkouts = props.edit;
    let allSessions;
    const auth = useContext(LoginRegisterContext);
    const [allWorkouts, setAllWorkouts] = useState([]);
    const getSessions = async () => {
        try {
            const response = await fetch(
                `https://bf-backend.onrender.com/api/users/usersworkoutsweekly/${user}`,
                // `http://localhost:5000/api/users/${user}`, keep this here for testing purposes for now
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
            allSessions = responseData.sessions
            setAllWorkouts(allSessions);
        } catch (err) {}
    };

    useEffect(() => {
        getSessions();
        console.log(auth.userID);
    }, []);

    return showEditWorkouts ? <SessionCard getUpdate={getSessions} workouts={allWorkouts} /> :  <ShowWorkoutsByWeek session={allWorkouts} />;
};

export default ShowAthleteSessionsHistory;
