import { useState, useContext } from "react";
import { LoginRegisterContext } from "../authentication/login-register-context";

export default function useDeleteSelectedSession() {
    const auth = useContext(LoginRegisterContext);
    const user = auth.userID;
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(null);
    const deleteSession = async (session_id) => {
        setIsDeleting(true);
        try {
            const response = await fetch(
                `https://bf-backend.onrender.com/api/users/${user}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Issuer " + auth.token,
                    },
                    body: JSON.stringify({
                        session: session_id,
                    }),
                }
            );
            setIsDeleting(false)
            if(!response.ok){
                const data = await response.json();
                throw new Error(data.message || "Error deleting session.");
            }
            const responseData = await response.json();
            console.log(responseData.message);
        } catch (err) {
            setIsDeleting(false);
            setError(err.message);
        }
        setIsDeleting(false);
    };
    return { deleteSession, isDeleting, error  }

};
