import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Heading,
    Flex,
    Button,
    Text,
    UnorderedList,
    ListItem,
} from "@chakra-ui/react";
import { LoginRegisterContext } from "../authentication/login-register-context";

const Periodization = () => {
    const navigate = useNavigate();
    const auth = useContext(LoginRegisterContext);
    const isLoggedIn = auth.isLoggedIn;
    return (
        <Box
            paddingTop="30px"
            paddingBottom="30px"
            height="100%"
            width="100%"
            bg="#151414"
        >
            <Flex justifyContent="end">
                {isLoggedIn && (
                    <Button
                        mt={4}
                        mr={4}
                        onClick={() => navigate("/athlete")}
                        borderRadius="50px"
                        color="white"
                        fontSize="xs"
                        bg="transparent"
                    >
                        Dashboard
                    </Button>
                )}
                <Button
                    mt={4}
                    mr={4}
                    onClick={() => navigate("/")}
                    bg="red"
                    borderRadius="50px"
                    color="white"
                    fontSize="xs"
                >
                    Home
                </Button>
            </Flex>
            <Box width="90%" margin="auto">
                <Heading as="h2" size="lg" mb={4} color="white">
                    Periodization
                </Heading>
                <Text color="white" fontSize="xs">
                    In a periodized cycle of training, progressive overload is
                    applied strategically to optimize the athlete's progress and
                    performance over time. Periodization involves dividing the
                    training program into specific phases or periods, each with
                    its own objectives and focus. Here's how an athlete can
                    apply progressive overload within a periodized cycle of
                    training:
                </Text>
                <UnorderedList color="white" fontSize="xs" mt={2} pl={4}>
                    <ListItem>
                        <strong>1 Foundation Phase:</strong> The initial phase
                        focuses on building a solid foundation of strength and
                        conditioning. During this phase, the athlete can start
                        with moderate weights and gradually increase the
                        intensity and volume of their workouts over several
                        weeks. Progressive overload is implemented by gradually
                        adding weight, repetitions, or sets to the exercises.
                    </ListItem>
                    <ListItem>
                        <strong>2 Hypertrophy Phase:</strong> The hypertrophy
                        phase aims to promote muscle growth and increase muscle
                        size. The athlete would typically work with higher
                        repetitions and moderate-to-higher volume. Progressive
                        overload is achieved by increasing the weight or
                        repetitions over time as the athlete adapts to the
                        training stimulus
                    </ListItem>
                    <ListItem>
                        <strong>3 Strength Phase:</strong> In this phase, the
                        athlete focuses on developing maximal strength. The
                        training program incorporates lower repetitions and
                        higher intensity. Progressive overload is applied by
                        gradually increasing the weight lifted while maintaining
                        proper form and technique. The athlete may also use
                        techniques like cluster sets, rest-pause sets, or heavy
                        negatives to further stimulate strength gains.
                    </ListItem>
                    <ListItem>
                        <strong>4 Power and Peaking Phase:</strong> This phase
                        aims to enhance power, speed, and sport-specific
                        performance. The athlete incorporates explosive
                        movements, plyometrics, and sport-specific drills.
                        Progressive overload is implemented by increasing the
                        intensity and speed of the exercises while maintaining
                        good form. The focus is on maximizing power output.
                    </ListItem>
                    <ListItem>
                        <strong>5 Deload and Recovery Phase:</strong>{" "}
                        Periodization also includes planned periods of recovery
                        to allow the body to adapt and avoid overtraining.
                        During this phase, the athlete reduces the training
                        volume and intensity to facilitate recovery. It's
                        important to note that progressive overload is
                        temporarily reduced or maintained at a lower level
                        during this phase to allow for optimal recovery and
                        supercompensation.
                    </ListItem>
                </UnorderedList>
                <Text color="white" fontSize="xs" mt={4}>
                    Throughout the periodized cycle, the athlete should track
                    their progress, monitor performance, and adjust the training
                    variables (weight, repetitions, sets) accordingly. This
                    allows for a gradual and systematic application of
                    progressive overload to continually challenge the body,
                    stimulate adaptation, and maximize performance gains.
                    Consulting with a qualified strength and conditioning coach
                    can be beneficial in designing a periodized program tailored
                    to the athlete's specific needs and goals.
                </Text>
            </Box>
        </Box>
    );
};

export default Periodization;
