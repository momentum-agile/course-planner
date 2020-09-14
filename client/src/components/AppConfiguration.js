import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { theme, ThemeProvider, CSSReset } from "@chakra-ui/core";

/**
 * Wrapper Component to wrap all the different configurations
 * the main App Component uses.
 */

const AppConfiguration = ({ children }) => {
    return (
        <ThemeProvider theme={customTheme}>
            <CSSReset />
            <Router>{children}</Router>
        </ThemeProvider>
    );
};

// See: https://chakra-ui.com/getting-started
const customTheme = {
    ...theme,
};

export default AppConfiguration;
