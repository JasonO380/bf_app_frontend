import React from "react";
import { Text, Stack } from "@chakra-ui/react";

const MacroDonutChartLegend = ({carbDayType, text}) => {
    console.log(carbDayType);
    console.log(text);
    return (
        <Stack display="flex" justifyContent="center" alignItems="center">
            <Text color="white">
            Carbs: {carbDayType.carbohydrates} {" "}
            Protein: {carbDayType.protein} {" "}
            Fats: {carbDayType.fats} {" "}
            </Text>
        </Stack>
    )
};

export default MacroDonutChartLegend;