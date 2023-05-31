import React, { useState } from "react";
import {
    Box,
    Stack,
    FormControl,
    FormLabel,
    Input,
    Button,
} from "@chakra-ui/react";
import LoadingSpinner from "./loading-spinner";

const FormComponent = (props) => {
    const onSubmit = props.onSubmit;
    const inputState = props.inputState;
    const changeHandler = props.changeHandler;
    const fields = props.fields;
    const buttonText = props.buttonText;
    const allData = props.allData;
    const isLoading = props.isLoading;
    const extraButtons = props.extraButtons;
    const message = props.message;
    const renderPlaceholder = (fieldName, dataKey) => {
        if (allData && allData[dataKey]) {
            return allData[dataKey][fieldName] || "";
        }
        return "";
    };

    return (
        <Box bg="offWhite" p={5} width="100%" margin="0 auto">
            <Stack margin="auto" width="80%" paddingBottom="60px">
                <form onSubmit={onSubmit}>
                    {fields.map((field) => (
                        <FormControl fontSize="xs" key={field.name}>
                            <FormLabel
                                fontSize="xs"
                                color="white"
                                htmlFor={field.name}
                            >
                                {field.label}
                            </FormLabel>
                            <Input
                                onChange={changeHandler}
                                value={inputState[field.name]}
                                fontSize="xs"
                                color="black"
                                name={field.name}
                                type={field.type || "text"}
                                bg="white"
                                placeholder={
                                    allData
                                        ? renderPlaceholder(
                                              field.name,
                                              field.dataKey
                                          )
                                        : field.placeholder
                                }
                            />
                        </FormControl>
                    ))}
                    <Button
                        mt={4}
                        borderRadius="50px"
                        width="100%"
                        type="submit"
                        bg="red"
                        color="white"
                        fontSize="xs"
                    >
                        {buttonText}
                    </Button>
                    {extraButtons &&
                        extraButtons.map((button, index) => (
                            <Button
                                key={index}
                                mt={4}
                                borderRadius="50px"
                                width="100%"
                                onClick={button.onClick}
                                bg="red"
                                color="white"
                                fontSize="xs"
                            >
                                {button.text}
                            </Button>
                        ))}
                </form>
                <Box margin="auto">
                    {isLoading && <LoadingSpinner text={message} />}
                </Box>
            </Stack>
        </Box>
    );
};

export default FormComponent;
