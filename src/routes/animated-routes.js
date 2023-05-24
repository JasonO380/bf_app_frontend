import React from "react";
import Intro from "../pages/homepage/intro";
import Login from "../authentication/login";
import Register from "../authentication/register";
import AddAthleteSession from "../athletes/add-athlete-session";
import Dashboard from "../pages/dashboard/dashboard";
import CoachDashboard from "../coaches/coach-dashboard";
import CarbCycling from "../Blogs/CarbCycling";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const AnimatedRoutes = () => {
    const location = useLocation();
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
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route
                    path="/"
                    element={
                        <motion.div
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageVariants}
                            transition={pageTransition}
                        >
                            <Intro />
                        </motion.div>
                    }
                />
                <Route path="/login" element={
                    <motion.div 
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageVariants}
                            transition={pageTransition}
                        >
                            <Login />
                        </motion.div>
                } />
                <Route path="/register" element={
                    <motion.div 
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageVariants}
                            transition={pageTransition}
                        >
                            <Register />
                        </motion.div>
                } />
                <Route path="/athlete" element={<Dashboard />} />
                <Route path="/coach" element={
                    <motion.div 
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageVariants}
                            transition={pageTransition}
                        >
                            <CoachDashboard />
                        </motion.div>
                } />
                <Route path="/carbcycling" element={
                    <motion.div 
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageVariants}
                            transition={pageTransition}
                        >
                            <CarbCycling />
                        </motion.div>
                } />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
