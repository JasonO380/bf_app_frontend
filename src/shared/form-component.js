import React from "react";
import {
    Box,
    Stack,
    FormControl,
    FormLabel,
    Input,
    Button,
} from "@chakra-ui/react";

const FormComponent = (props) => {
    const onSubmit = props.onSubmit;
    const inputState = props.inputState;
    const changeHandler = props.changeHandler;
    const fields = props.fields;
    const buttonText = props. buttonText;
    const allData= props.allData;
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
                        <FormControl key={field.name}>
                            <FormLabel color="white" htmlFor={field.name}>
                                {field.label}
                            </FormLabel>
                            <Input
                                onChange={changeHandler}
                                value={inputState[field.name]}
                                name={field.name}
                                type={field.type || "text"}
                                bg="white"
                                placeholder={allData ? renderPlaceholder(field.name, field.dataKey) : field.placeholder}
                            />
                        </FormControl>
                    ))}
                    <Button
                        mt={4}
                        width="100%"
                        type="submit"
                        bg="red"
                        color="white"
                    >
                        {buttonText}
                    </Button>
                </form>
            </Stack>
        </Box>
    );
};

export default FormComponent;
