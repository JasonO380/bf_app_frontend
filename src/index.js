import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Global, css } from "@emotion/core";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
const theme = extendTheme({
    fonts: {
        heading: "Montserrat",
        body: "Montserrat",
    },
});
root.render(
    <ChakraProvider theme={theme}>
        <Global
            styles={css`
                /* Load Montserrat font from Google Fonts */
                @import url("https://fonts.googleapis.com/css?family=Montserrat&display=swap");

                /* Apply Montserrat font to all elements */
                body {
                    font-family: "Montserrat", sans-serif;
                    /*overflow-anchor: none;*/
                }
            `}
        />
        <App />
    </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
