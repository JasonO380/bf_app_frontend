import React, {
    useContext,
    useState,
    useEffect,
    useRef,
} from "react";
import { LoginRegisterContext } from "../authentication/login-register-context";
import {
    Box,
    Heading,
    Flex,
    Button,
    Text,
    Input
} from "@chakra-ui/react";

const EditMovement = () => {
    const auth = useContext(LoginRegisterContext);
    const [allMovements, setAllMovements] = useState([]);
    const [editMovementID, setEditMovementID] = useState(null);
    const [editedMovementName, setEditedMovementName] = useState("");
    const inputRef = useRef(null);
    const getMovements = async () => {
        const response = await fetch("http://localhost:5000/api/movement", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Issuer " + auth.token,
            },
        });
        const responseData = await response.json();
        setAllMovements(responseData.movements);
    };

    const editMovement = async (event) => {
        event.preventDefault();
        console.log(editedMovementName);
        try {
            const response = await fetch(
                `http://localhost:5000/api/movement/${editMovementID}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Issuer " + auth.token,
                    },
                    body: JSON.stringify({
                        movement: editedMovementName,
                    }),
                }
            );
            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message);
            }
            setEditedMovementName("");
            getMovements();
        } catch (err) {
            console.error(err.message || "Failed to edit the movement");
        } finally {
            setEditMovementID(null);
        }
    };

    const deleteMovement = async (id) => {
        console.log(id);
        try {
            const response = await fetch(
                `http://localhost:5000/api/movement/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (!response.ok) {
                const errorData = await response.json();
                console.log(errorData.message);
                throw new Error(errorData.message);
            }
            const responseData = await response.json();
            console.log(responseData.message);
        } catch (err) {
            console.log(err);
        }
        getMovements();
    };

    // useEffect(() => {
    //     console.log('editMovementID ', editMovementID);
    //     if (editMovementID) {
    //         console.log("Edit mode");
    //     }
    // }, [editMovementID]);

    const handleEditClick = (event) => {
        editMovement(event);
    };

    useEffect(() => {
        getMovements();
    }, []);

    return (
        <Box>
            <Heading color="white" marginBottom="10px" textAlign="center">
                Movements
            </Heading>
            {allMovements &&
                allMovements.map((m) => (
                    <Flex
                        width="90%"
                        margin="auto"
                        key={m._id}
                        justifyContent="space-between"
                        marginBottom="6px"
                    >
                        <Box marginRight="8px">
                            {editMovementID === m._id ? (
                                <Input
                                    placeholder={m.movement}
                                    value={editedMovementName}
                                    onChange={(e) =>
                                        setEditedMovementName(e.target.value)
                                    }
                                    color="white"
                                />
                            ) : (
                                <Text color="white">{m.movement}</Text>
                            )}
                        </Box>
                        <Flex>
                            {editMovementID === m._id ? (
                                <>
                                    <Button
                                    onClick={(event) => handleEditClick(event)}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        onClick={() => setEditMovementID(null)}
                                    >
                                        Cancel
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        onClick={() => {
                                            setEditMovementID(prevId => m._id)
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => deleteMovement(m._id)}
                                    >
                                        Delete
                                    </Button>
                                </>
                            )}
                        </Flex>
                    </Flex>
                ))}
        </Box>
    );
};

export default EditMovement;
