import React, { useEffect, useContext, useState } from "react";
import SessionCard from "../shared/sessions-card";
import { Box, Button } from "@chakra-ui/react";
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


    // const deleteSession = async (event) => {
    //     console.log(event.target.name);
    //     sessionToDelete = event.target.name;
    //     const userID = auth.userID;
    //     try {
    //         const response = await fetch(
    //             `http://localhost:5000/api/users/${userID}`,
    //             {
    //                 method: "DELETE",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     Authorization: "Issuer " + auth.token,
    //                 },
    //                 body: JSON.stringify({
    //                     session: sessionToDelete,
    //                 }),
    //             }
    //         );
    //         const responseData = await response.json();
    //         console.log(responseData.message);
    //     } catch (err) {}
    //     getSessions();
    // };

    // const updateHandler = (event) => {
    //     updateID = event.target.name;
    //     setUpdate(event.target.name);
    //     setEditSession(true);
    // };

    useEffect(() => {
        setID(user);
        getSessions();
        console.log(auth.userID);
    }, []);


    // return <SessionCard update={editSession} workouts={allWorkouts} />;
    return showEditWorkouts ? <SessionCard workouts={allWorkouts} /> :  <AthletesTopSets session={allWorkouts} />;
};

export default ShowAthleteSessionsHistory;
