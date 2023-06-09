import React from "react";
import {
    Box,
    Text,
    Switch,
    Flex,
    Button,
    Stack,
    FormControl,
    FormLabel,
    Input,
} from "@chakra-ui/react";

const MacroCalculatorForm = ({changeHandler, inputState, calculateMacros, toggleSex, convertToKG, calculateHeight }) => {
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
                        <Flex gap="10px">
                        <Stack>
                            <Input
                                onChange={(e) => changeHandler(e)}
                                value={inputState.heightFeet}
                                name="heightFeet"
                                type="text"
                                bg="white"
                                fontSize="xs"
                                marginRight="10px"
                            />
                            <Text color="white" fontSize="xs">Feet</Text>
                            </Stack>
                            <Stack>
                            <Input
                                onChange={(e) => changeHandler(e)}
                                value={inputState.heightInches}
                                name="heightInches"
                                type="text"
                                bg="white"
                                fontSize="xs"
                                width="50px"
                            />
                            <Text color="white" fontSize="xs">Inches</Text>
                            </Stack>
                        </Flex>
                        {/* <Input
                            onChange={(e) => changeHandler(e)}
                            value={inputState.height}
                            name="height"
                            type="text"
                            bg="white"
                            placeholder="height"
                            fontSize="xs"
                        /> */}
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
                    <FormLabel fontSize="xs" color="white" htmlFor="sex">
                        Sex
                    </FormLabel>
                    <Stack>
                    <Switch
                        id="sex"
                        name="sex"
                        colorScheme="teal"
                        isChecked={inputState.sex === "female"}
                        onChange={toggleSex}
                    />
                    <Text color="white" fontSize="xs">{inputState.sex}</Text>
                    </Stack>
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
