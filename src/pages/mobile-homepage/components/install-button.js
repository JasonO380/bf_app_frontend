import React, { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";

const InstallApp = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [buttonDisplay, setButtonDisplay] = useState(false);

    useEffect(() => {
        window.addEventListener("beforeinstallprompt", (event) => {
            event.preventDefault();
            setDeferredPrompt(event);
            setButtonDisplay(true);
        });

        window.addEventListener("appinstalled", (event) => {
            setDeferredPrompt(null);
            setButtonDisplay(false);
        });
    }, []);

    const handleButtonClick = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === "accepted") {
                    console.log("User accepted the install prompt");
                } else {
                    console.log("User dismissed the install prompt");
                }
                setDeferredPrompt(null);
                setButtonDisplay(false);
            });
        }
    };

    return buttonDisplay ? (
        <Button
            borderRadius="50"
            mt="20px"
            fontSize="xs"
            color="white"
            backgroundColor="red"
            onClick={handleButtonClick}
        >
            Install App
        </Button>
    ) : null;
};

export default InstallApp;
