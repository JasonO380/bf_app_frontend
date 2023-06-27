import React, { useEffect, useState, useContext } from "react";
import { Box, Text } from "@chakra-ui/react";
import { LoginRegisterContext } from "../authentication/login-register-context";
import SelectBox from "../shared/select-box";

const GetGoogleSheets = () => {
    const auth = useContext(LoginRegisterContext);
    const [googleSheets, setGoogleSheets] = useState();
    const [clientProgramming, setClientProgramming] = useState([]);

    const getGoogleSheets = async (API) => {
        try {
            const response = await fetch(
                `${API}`
            );
            const responseData = await response.json();
            const sheets = responseData.data;
            setGoogleSheets(sheets);
            console.log(sheets.map((data) => data.sheetName));
            console.log(sheets.map((data) => data.data));
        } catch (err) {}
        getUserProgramming()
    };

    const getUserProgramming = async () => {
        const userID = auth.userID;
        try {
            const response = await fetch(
                `https://bf-backend.onrender.com/api/programming/getuserprograms/${userID}`
            );
            const responseData = await response.json();
            const program = responseData.programmingData;
            setClientProgramming(program);
        } catch (err) {}
    }

    const handleSelect = (client) => {
        getGoogleSheets(client.cycleAPI)
    };

    useEffect(() => {
        getUserProgramming()
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
            <>
                <Box marginTop="15px" width="90%" margin="auto">
                    {clientProgramming.length > 0 && (
                        <Box>
                            <Text color="white">Select program to view</Text>
                            <SelectBox
                            data={clientProgramming}
                            selectedOption={handleSelect}
                            labelKey="cycleName" />
                        </Box>
                    )}
                    {googleSheets &&
                        googleSheets.map((tab, index) => {
                            const sheetData = tab.data;
                            return (
                                <Box 
                                key={index}
                                paddingBottom="60px"
                                overflowX="auto"
                                whiteSpace="nowrap">
                                    <Text
                                        fontWeight="bold"
                                        fontSize="2xl"
                                        color="white"
                                    >
                                        {tab.sheetName}
                                    </Text>
                                    {sheetData.map((data, index) => {
                                        return (
                                            <Box
                                                key={index}
                                                mb={2}
                                            >
                                                {data === "Day 1" ||
                                                data === "Day 2" ||
                                                data === "Day 3" ||
                                                data === "Day 4" ||
                                                data === "Day 5" ||
                                                data === "Day 6" ? (
                                                    <Text
                                                        fontWeight="bold"
                                                        color="white"
                                                    >
                                                        {data}
                                                    </Text>
                                                ) : (
                                                        <Text color="white">
                                                            {data.join(" ")}
                                                        </Text>
                                                )}
                                            </Box>
                                        );
                                    })}
                                </Box>
                            );
                        })}
                </Box>
            </>
        </Box>
    );
};

export default GetGoogleSheets;
