import { useState, useEffect, useContext } from "react";
import { LoginRegisterContext } from "../authentication/login-register-context";

export default function useGetSessions(user, fetchType = 'all', refreshSessions) {
    console.log(user);
    console.log(fetchType);
    const [workouts, setWorkouts] = useState();
    const [sessionsLoading, setSessionsLoading] = useState(false);
    const auth = useContext(LoginRegisterContext);
    let allSessions;

    useEffect(() => {
        getSessions(user);
    }, [user, refreshSessions]);

    const getSessions = async (user) => {
        console.log("get sessions hook is being called");
        setSessionsLoading(true);
        if (fetchType === "all") {
            try {
                const response = await fetch(
                    `https://bf-backend.onrender.com/api/users/${user}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Issuer " + auth.token,
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch sessions.");
                }
                const responseData = await response.json();
                allSessions = responseData.sessions;
                console.log(allSessions);
                // Filter sessions
                const validSessions = allSessions.filter((session) => {
                    return session.months.every((month) => {
                        return month.month; // month name exists
                    });
                });
                console.log(validSessions);
                setWorkouts(validSessions);
            } catch (err) {
                console.error("Error fetching sessions:", err);
            } finally {
                setSessionsLoading(false);
            }
        } else if (fetchType === "today") {
            try {
                const response = await fetch(
                    `https://bf-backend.onrender.com/api/users/${user}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Issuer " + auth.token,
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch sessions.");
                }
                const responseData = await response.json();
                allSessions = responseData.sessions;
                console.log(allSessions);
                // Filter sessions
                const validSessions = allSessions.filter((session) => {
                    return session.months.every((month) => {
                        return month.month; // month name exists
                    });
                });
                console.log(validSessions);
                const date = new Date();
                const month = date.toLocaleString("default", { month: "long" });
                const dayOfMonth = date.getDate();
                let todaysSessions = [];
                validSessions.forEach((data) => {
                    data.months.forEach((monthObj) => {
                        if (monthObj.month === month) {
                            monthObj.days.forEach((dayObj) => {
                                if (dayObj.day === dayOfMonth) {
                                    todaysSessions.push(...dayObj.sessions);
                                }
                            });
                        }
                    });
                });
                setWorkouts(todaysSessions);
            } catch (err) {
                console.error("Error fetching sessions:", err);
            } finally {
                setSessionsLoading(false);
            }
        }
    };

    return { workouts, sessionsLoading };
}
