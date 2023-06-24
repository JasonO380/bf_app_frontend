import React, { useEffect, useState, useReducer } from "react";
import { Box, Text } from "@chakra-ui/react";
import SelectBox from "../shared/select-box";
import FormComponent from "../shared/form-component";

const AddGoogleSheets = () => {
    const [user, setUser] = useState();
    const [selectedClient, setSelectedClient] = useState();

    const inputReducer = (state, action) => {
        switch (action.type) {
            case "INPUT_CHANGE":
                return {
                    ...state,
                    [action.name]: action.value,
                };
            case "CLEAR_FORM":
                return {
                    movement: "",
                };
            default:
                return state;
        }
    };

    const [inputState, dispatch] = useReducer(inputReducer, {
        cycleName: "",
        cycleAPI: "",
    });

    const getAllUsers = async () => {
        const response = await fetch(
            "https://bf-backend.onrender.com/api/users/allusers"
        );
        const responseData = await response.json();
        console.log(responseData.users);
        const users = responseData.users;
        console.log(users.map((user) => user.username));
        setUser(users);
    };

    const handleSelect = (client) => {
        console.log(client);
        console.log(client.id);
        setSelectedClient(client);
    };

    const changeHandler = (event) => {
        const inputValue = event.target.value;
        const inputName = event.target.name;
        console.log(inputValue)
        dispatch({
            type: "INPUT_CHANGE",
            name: inputName,
            value: inputValue,
        });
    };

    const addGoogleSheet = async () => {
        const response = await fetch(
            "http://localhost:5000/api/programming/addgooglesheets",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    cycleName: inputState.cycleName,
                    cycleAPI: inputState.cycleAPI,
                    athlete: selectedClient.id,
                }),
            }
        );
    };

    const fields = [
        {
            name: "cycleName",
            label: "Cycle name",
            type: "text",
            placeholder: "Enter name of cycle",
        },
        {
            name: "cycleAPI",
            label: "API end point",
            type: "text",
            placeholder: "Enter google sheets API",
        },
    ];

    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <Box
            width="100%"
            bottom="0"
            position="relative"
            minHeight="100vh"
            bg="#151414"
            overflowY="auto"
        >
            <Box margin="auto" width="90%">
                {user && (
                    <SelectBox
                        data={user}
                        labelKey="username"
                        selectedOption={handleSelect}
                    />
                )}
                {selectedClient && <Text color="white">{selectedClient.username}</Text>}
                <FormComponent
                    fields={fields}
                    onSubmit={addGoogleSheet}
                    inputState={inputState}
                    changeHandler={changeHandler}
                    buttonText="Add program"
                    // isLoading={isLoading}
                />
            </Box>
        </Box>
    );
};

export default AddGoogleSheets;
