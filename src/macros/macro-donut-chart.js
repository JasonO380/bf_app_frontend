import React from "react";
import { Flex, Box, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import DonutChart from "../shared/donut-chart";

const MacroDonutChart = (props) => {
    const cData = props.cData;
    const cOptions = props.cOptions;
    const startIndex = props.startIndex;
    const canMovePrev = props.canMovePrev;
    const canMoveNext = props.canMoveNext;
    const handlePrevClick = props.handlePrevClick;
    const handleNextClick = props.handleNextClick;

    return (
        <React.Fragment>
            <Flex justifyContent="center" gap="10px" height="12rem">
                {cData.slice(startIndex, startIndex + 2).map((data, index) => (
                    <Box key={index} width="50%">
                        <DonutChart
                            data={data}
                            options={cOptions[startIndex + index]}
                        />
                    </Box>
                ))}
            </Flex>
            <Flex justifyContent="center" gap="25px">
                <IconButton
                    icon={<ChevronLeftIcon />}
                    onClick={handleNextClick}
                    disabled={!canMoveNext}
                />
                {canMovePrev && (
                    <IconButton
                        icon={<ChevronRightIcon />}
                        onClick={handlePrevClick}
                        disabled={!canMovePrev}
                    />
                )}
            </Flex>
        </React.Fragment>
    );
};

export default MacroDonutChart;
