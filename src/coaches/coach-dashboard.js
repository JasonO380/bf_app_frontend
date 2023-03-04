import React, { useState, useEffect, useContext } from "react";
import { Select, Box, Heading, Text, Stack } from "@chakra-ui/react";
import { LoginRegisterContext } from "../authentication/login-register-context";
import AddClient from "./add-client";
import ClientSessions from "./get-client-sessions";
import AddClientSession from "./add-client-sessions";

const CoachDashboard = () => {
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState("");
    const [coach, setCoach] = useState();
    const [showClientSessions, setShowClientSessions] = useState(false);
    const [clientName, setClientName] = useState();
    const auth = useContext(LoginRegisterContext);
    const [clientID, setClientID] = useState();
    console.log(auth);

    const getClients = async (cid) => {
        console.log(cid);
        try {
            console.log(auth.userID);
            const response = await fetch(
                `http://localhost:5000/api/coach/client/${auth.userID}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Issuer " + auth.token,
                    },
                }
            );
            const responseData = await response.json();
            setClients(responseData.clients);
        } catch (err) {}
    };

    const getCoach = async () => {
        console.log(auth);
        console.log(auth.userID);
        if (auth.userID) {
            try {
                console.log(auth.userID);
                const response = await fetch(
                    `http://localhost:5000/api/coach/${auth.userID}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Issuer " + auth.token,
                        },
                    }
                );
                const responseData = await response.json();
                setCoach(responseData.coach);
            } catch (err) {}
            getClients(auth.userID);
        }
    };

    const clientSelect = (event) => {
        setClientID(event.target.value);
        console.log(event.target.selectedOptions[0].text);
        console.log(event.target.value);
        setClientName(event.target.selectedOptions[0].text);
        setShowClientSessions(true);
        getClients();
    };

    useEffect(() => {
        getCoach();
    }, [auth.userID]);

    useEffect(()=> {
        console.log(coach)
        console.log(clients)
    }, [coach, clients])

    return (
        <React.Fragment>
            <Stack>
                <Heading>Coach Dashboard</Heading>
                <Text>Welcome coach: {coach ? `${coach.coachName}` : "Loading..."} </Text>
                <select
                onChange={clientSelect}
                value={selectedClient}
                name={clientName}
                placeholder="Choose client"
            >
                <option disabled value="">
                    Choose client
                </option>
                {clients.map((client) => (
                    <option onClick={clientSelect} key={client._id} name={client.clientName} value={client._id}>
                        {client.clientName}
                    </option>
                ))}
            </select>
            </Stack>
            <AddClient updateClients={getClients} />
            {showClientSessions && (
                <React.Fragment>
                    <Text>Client: {clientName}</Text>
                    <ClientSessions client={clientID} />
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default CoachDashboard;
