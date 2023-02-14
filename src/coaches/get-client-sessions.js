import React, { useEffect, useContext, useState } from "react";
import {
    Box,
    Image,
    Flex,
    Text,
    Button,
    Stack,
    FormControl,
    FormLabel,
    Input,
} from "@chakra-ui/react";
import { LoginRegisterContext } from "../authentication/login-register-context";
import DisplaySessions from "../shared/display-sessions";

const ClientSessions = (props) => {
    const clientID = props.client;
    const auth = useContext(LoginRegisterContext);
    const [workouts, setWorkouts] = useState()
    const [client, setClient] = useState(clientID);
    console.log(client);
    const getClientSessions = async () => {
        try {
            const response = await fetch (
                `http://localhost:5000/api/client/${clientID}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Issuer " + auth.token,
                    },
                }
            );
            const responseData = await response.json();
            setWorkouts(responseData.sessions);
            console.log(responseData.sessions);
        } catch (err) {}
    };

    useEffect(()=> {
        getClientSessions()
    },[]);

    useEffect(()=> {
        console.log(workouts)
    }, [workouts])

    return (
        <DisplaySessions workouts={workouts} />
    )
};

export default ClientSessions;