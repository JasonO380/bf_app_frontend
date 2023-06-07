import React from "react";
import {
    Box,
    Switch,
    Flex,
    Button,
    Stack,
    FormControl,
    FormLabel,
    Input,
} from "@chakra-ui/react";

const MacroCalculatorForm = ({changeHandler, inputState, calculateMacros, toggleGender, convertToKG }) => {
    return (
        <form onSubmit={calculateMacros}>
            <Flex gap="10px" margin="auto" width="100%" paddingBottom="5px">
                <FormControl>
                    <Stack>
                        <FormLabel fontSize="xs" color="white" htmlFor="weight">
                            Weight
                        </FormLabel>
                        <Input
                            onChange={(e) => changeHandler(e)}
                            value={inputState.weight}
                            name="weight"
                            type="text"
                            bg="white"
                            placeholder="Weight"
                            fontSize="xs"
                        />
                    </Stack>
                </FormControl>
                <FormControl>
                    <Stack>
                        <FormLabel fontSize="xs" color="white" htmlFor="height">
                            Height
                        </FormLabel>
                        <Input
                            onChange={(e) => changeHandler(e)}
                            value={inputState.height}
                            name="height"
                            type="text"
                            bg="white"
                            placeholder="height"
                            fontSize="xs"
                        />
                    </Stack>
                </FormControl>
                <FormControl>
                    <Stack>
                        <FormLabel fontSize="xs" color="white" htmlFor="height">
                            Age
                        </FormLabel>
                        <Input
                            onChange={(e) => changeHandler(e)}
                            value={inputState.age}
                            name="age"
                            type="text"
                            bg="white"
                            placeholder="age"
                            fontSize="xs"
                        />
                    </Stack>
                </FormControl>
                <FormControl>
                    <FormLabel fontSize="xs" color="white" htmlFor="gender">
                        Gender
                    </FormLabel>
                    <Switch
                        id="gender"
                        colorScheme="teal"
                        isChecked={inputState.gender === "female"}
                        onChange={toggleGender}
                    />
                </FormControl>
            </Flex>
            <Flex gap="10px" margin="auto" width="100%" paddingBottom="5px">
                <Button
                    mt={4}
                    name={inputState.weight}
                    border="1px solid white"
                    borderRadius="50px"
                    width="fit-content"
                    onClick={() => convertToKG(inputState.weight)}
                    type="button"
                    bg="transparent"
                    color="white"
                    fontSize="xs"
                >
                    Convert weight KG
                </Button>
                <Button
                    mt={4}
                    borderRadius="50px"
                    width="fit-content"
                    type="submit"
                    bg="red"
                    color="white"
                    fontSize="xs"
                >
                    Calculate BMR
                </Button>
            </Flex>
        </form>
    );
};

export default MacroCalculatorForm;
