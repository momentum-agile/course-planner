import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { theme, ThemeProvider, CSSReset } from "@chakra-ui/core";

/**
 * Wrapper Component to wrap all the different configurations
 * the main App Component uses.
 */

const AppConfiguration = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <CSSReset />
            <Router>{children}</Router>
        </ThemeProvider>
    );
};

export default AppConfiguration;
