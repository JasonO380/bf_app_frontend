import React, { useEffect, useContext, useState } from "react";
import SessionCard from "../shared/sessions-card";
import AthletesTopSets from "./athletes-top-sets";
import { LoginRegisterContext } from "../authentication/login-register-context";

const ShowAthleteSessionsHistory = (props) => {
    const user = props.user;
    const showEditWorkouts = props.edit;
    const [id, setID] = useState();
    const history = props.history;
    let sessionToDelete;
    let updateID;
    let ses = [];
    let allSessions;
    console.log(user);
    const [editWorkouts, setEditWorkouts] = useState(false);
    const newSession = props.newSession;
    const auth = useContext(LoginRegisterContext);
    const [update, setUpdate] = useState();
    const [workouts, setWorkouts] = useState([]);
    const [allWorkouts, setAllWorkouts] = useState([]);
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
            allSessions = responseData.sessions.reverse();
            allSessions.map((s) => {
                const date = new Date();
                const year = date.getFullYear();
                const month = date.toLocaleString("en-US", { month: "long" });
                const dayOfWeek = date.toLocaleString("default", {
                    weekday: "long",
                });
                if (
                    s.year === year &&
                    s.month === month &&
                    s.dayOfWeek === dayOfWeek
                ) {
                    ses.push(s);
                }
            });
            setWorkouts(ses);
            setAllWorkouts(allSessions);
        } catch (err) {}
    };

    useEffect(() => {
        setID(user);
        getSessions();
        console.log(auth.userID);
    }, []);


    return showEditWorkouts ? <SessionCard onUpdate={getSessions} workouts={allWorkouts} /> :  <AthletesTopSets session={allWorkouts} />;
};

export default ShowAthleteSessionsHistory;
