import React from "react";
import Intro from "../pages/homepage/intro";
import Login from "../authentication/login";
import Register from "../authentication/register";
import AddAthleteSession from "../athletes/add-athlete-session";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

const AnimatedRoutes = () => {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Intro />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/athlete" element={<AddAthleteSession />} />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes;