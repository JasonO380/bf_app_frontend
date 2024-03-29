import React, { useEffect, useState, Suspense } from "react";
import SplashPage from "../shared/Splash-page";
import Login from "../authentication/login";
import Register from "../authentication/register";
import CoachDashboard from "../coaches/coach-dashboard";
import MacroCalculator from "../macros/macro-calculator";
import SuccessMindset from "../Blogs/SuccessMindset";
import CarbCycling from "../Blogs/CarbCycling";
import Periodization from "../Blogs/Periodization";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import GetGoogleSheets from "../athletes/get-google-sheets";
import AddGoogleSheets from "../athletes/add-google-sheets";
import EditMovement from "../pages/admin/components/edit-movement";
import Admin from "../pages/admin/admin";
import { Box } from "@chakra-ui/react";
import WelcomeMessage from "../pages/mobile-homepage/components/welcome-message";

const AnimatedRoutes = () => {
    const Intro = React.lazy(() => import("../pages/homepage/intro"));
    const Dashboard = React.lazy(() => import("../pages/dashboard/dashboard"));
    const [showSplash, setShowSplash] = useState(true);
    const location = useLocation();
    const MotionBox = motion(Box);
    const pageVariants = {
        initial: {
            opacity: 0,
            x: "-100%",
        },
        in: {
            opacity: 1,
            x: 0,
        },
        out: {
            opacity: 0,
            y: "-100%",
        },
    };

    const pageTransition = {
        type: "tween",
        ease: "anticipate",
        duration: 0.4,
    };

    const splashMessages = {
        "/": "Lean Strong Mobile",
        "/athlete": "Gains on the way",
        "/register": "Accountability matters",
        "/login": "Welcome back",
        "/coach": "Lead by example",
        "/welcome": "Thanks for visiting",
        "/carbcycling": "Eat for results",
        "/periodization": "Train for the long game",
        "/successmindset": "Embrace the process",
        "/macrocalculator": "Organize your eating habits",
    };

    const splashMessage = splashMessages[location.pathname] || "Loading...";

    useEffect(() => {
        setShowSplash(true);
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 1300); // Adjust the delay as needed (in milliseconds)

        return () => {
            clearTimeout(timer);
        };
    }, [location]);

    return (
        <>
            {showSplash && <SplashPage text={splashMessage} />}
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route
                        path="/"
                        element={
                            <MotionBox
                                initial="initial"
                                animate="in"
                                exit="out"
                                variants={pageVariants}
                                transition={pageTransition}
                            >
                                <Suspense>
                                    <Intro />
                                </Suspense>
                            </MotionBox>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <MotionBox
                                initial="initial"
                                animate="in"
                                exit="out"
                                variants={pageVariants}
                                transition={pageTransition}
                            >
                                <Login />
                            </MotionBox>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <motion.div
                                initial="initial"
                                animate="in"
                                exit="out"
                                variants={pageVariants}
                                transition={pageTransition}
                            >
                                <Register />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/athlete"
                        element={
                            <Suspense>
                                <Dashboard />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/coach"
                        element={
                            <motion.div
                                initial="initial"
                                animate="in"
                                exit="out"
                                variants={pageVariants}
                                transition={pageTransition}
                            >
                                <CoachDashboard />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/welcome"
                        element={
                            <motion.div
                                initial="initial"
                                animate="in"
                                exit="out"
                                variants={pageVariants}
                                transition={pageTransition}
                            >
                                <WelcomeMessage />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/carbcycling"
                        element={
                            <motion.div
                                initial="initial"
                                animate="in"
                                exit="out"
                                variants={pageVariants}
                                transition={pageTransition}
                            >
                                <CarbCycling />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/periodization"
                        element={
                            <motion.div
                                initial="initial"
                                animate="in"
                                exit="out"
                                variants={pageVariants}
                                transition={pageTransition}
                            >
                                <Periodization />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/successmindset"
                        element={
                            <motion.div
                                initial="initial"
                                animate="in"
                                exit="out"
                                variants={pageVariants}
                                transition={pageTransition}
                            >
                                <SuccessMindset />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/macrocalculator"
                        element={
                            <motion.div
                                initial="initial"
                                animate="in"
                                exit="out"
                                variants={pageVariants}
                                transition={pageTransition}
                            >
                                <MacroCalculator />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/splashpage"
                        element={
                            <motion.div
                                initial="initial"
                                animate="in"
                                exit="out"
                                variants={pageVariants}
                                transition={pageTransition}
                            >
                                <SplashPage text="Gains on the way" />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/workouts"
                        element={
                            <motion.div
                                initial="initial"
                                animate="in"
                                exit="out"
                                variants={pageVariants}
                                transition={pageTransition}
                            >
                                <GetGoogleSheets />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/admin"
                        element={
                            <motion.div
                                initial="initial"
                                animate="in"
                                exit="out"
                                variants={pageVariants}
                                transition={pageTransition}
                            >
                                <Admin />
                            </motion.div>
                        }
                    />
                </Routes>
            </AnimatePresence>
        </>
    );
};

export default AnimatedRoutes;
