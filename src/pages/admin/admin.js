import React from "react";
import { Box } from "@chakra-ui/react";
import AddGoogleSheets from "../../athletes/add-google-sheets";
import EditMovement from "../../athletes/edit-movement";

const Admin = () => {
    return (
        <Box minHeight="100vh" width="100%" bg="#151414" >
            <AddGoogleSheets />
            <EditMovement />
        </Box>
    )
}

export default Admin;