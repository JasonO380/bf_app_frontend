import React, { useState, useEffect, useContext } from "react";
import { Select, Box, Heading, Text, Stack } from "@chakra-ui/react";
import { LoginRegisterContext } from "../authentication/login-register-context";
import AddClient from "./add-client";


const CoachDashboard = () => {
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState("");
    const [coach, setCoach] = useState()
    // const { coachName } = coach;
    const auth = useContext(LoginRegisterContext);
    console.log(auth.userID);


    const getClients = async (event) => {
        try {
            console.log(auth.userID);
            const response = await fetch (
                `http://localhost:5000/api/coach/client/${auth.userID}`,
                {
                    method:"GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Issuer " + auth.token,
                    }
                }
            );
            const responseData = await response.json();
            console.log(responseData.clients);
            setClients(responseData.clients)
        } catch (err) {}
    };

    const getCoach = async () => {
        console.log(auth.userID);
        try {
            console.log(auth.userID);
            const response = await fetch (
                `http://localhost:5000/api/coach/${auth.userID}`,
                {
                    method:"GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Issuer " + auth.token,
                    }
                }
            );
            const responseData = await response.json();
            console.log(responseData.coach);
            setCoach(responseData.coach);
            getClients();
        } catch (err) {}
    }

    const clientSelect = (event) => {
        console.log(event.target.value)
    }

    useEffect(()=> {
        getCoach();
    },[auth.userID])

    useEffect(()=> {
        console.log(coach)
        console.log(clients)
    }, [coach, clients])

    return (
        <React.Fragment>
        <Stack>
            <Heading>Coach Dashboard</Heading>
            <Text>Welcome coach</Text>
            <select
                onChange={clientSelect}
                value={selectedClient}
                placeholder="Choose client"
            >
                <option disabled value="">
                    Choose client
                </option>
                {clients.map((client) => (
                    <option key={client._id} value={client._id}>
                        {client.clientName}
                    </option>
                ))}
            </select>
        </Stack>
        <AddClient />
        </React.Fragment>
    );
};

export default CoachDashboard;
