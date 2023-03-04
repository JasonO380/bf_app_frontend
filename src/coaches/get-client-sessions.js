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
import AddClientSession from "./add-client-sessions";

const ClientSessions = (props) => {
    const clientID = props.client;
    const auth = useContext(LoginRegisterContext);
    const [workouts, setWorkouts] = useState();
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
        } catch (err) {};
    };

    useEffect(()=> {
        setClient(clientID)
    }, [clientID])

    useEffect(()=> {
        console.log(clientID);
        getClientSessions()
    },[client, auth.token]);

    useEffect(()=> {
        console.log(clientID);
        console.log(workouts);
    }, [clientID, workouts]);

    return (
        workouts ? (
            <React.Fragment>
                <DisplaySessions 
                workouts={workouts} />
                <AddClientSession 
                getClientSessions={getClientSessions} 
                clientID={clientID} />
            </React.Fragment>
        ) : null
    )
};

export default ClientSessions;