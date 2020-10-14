import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { theme, ThemeProvider, CSSReset } from "@chakra-ui/core";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

/**
 * Wrapper Component to wrap all the different configurations
 * the main App Component uses.
 */
const AppConfiguration = ({ children }) => {
    return (
        <DndProvider backend={HTML5Backend}>
            <ThemeProvider theme={customTheme}>
                <CSSReset />
                <Router>{children}</Router>
            </ThemeProvider>
        </DndProvider>
    );
};

/**
 * See: https://chakra-ui.com/getting-started
 */
const customTheme = {
    ...theme,
    fontSizes: {
        xs: "0.75rem",
        sm: "0.875rem",
        md: "1rem",
        // Use for Large input headers
        lg: "2.5rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
    },
};

export default AppConfiguration;
