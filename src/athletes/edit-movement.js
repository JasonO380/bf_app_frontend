import React, {
    useContext,
    useReducer,
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
    Stack,
    FormControl,
    FormLabel,
    Input,
    background,
} from "@chakra-ui/react";

const EditMovement = () => {
    const auth = useContext(LoginRegisterContext);
    const [allMovements, setAllMovements] = useState([]);
    const [editMovementID, setEditMovementID] = useState(null);
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

    const editMovement = (id) => {
        console.log(id);
    };

    const deleteMovement = (id) => {
        console.log(id);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setEditMovementID(null);
            }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Cleanup when component unmounts or when editingId changes
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [editMovementID]);
    

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
                        <Box>
                            {editMovementID === m._id ? (
                                <Input
                                    defaultValue={m.movement}
                                    ref={inputRef}
                                    onBlur={() => {
                                        // Handle saving the edited name here
                                        setEditMovementID(null); // This will revert back to the Text view after saving
                                    }}
                                />
                            ) : (
                                <Text color="white">{m.movement}</Text>
                            )}
                        </Box>
                        <Flex>
                            <Button onClick={() => setEditMovementID(m._id)}>
                                Edit
                            </Button>
                            <Button onClick={() => deleteMovement(m._id)}>
                                Delete
                            </Button>
                        </Flex>
                    </Flex>
                ))}
        </Box>
    );
};

export default EditMovement;
