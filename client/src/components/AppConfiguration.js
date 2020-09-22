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

// See: https://chakra-ui.com/getting-started
const customTheme = {
    ...theme,
};

export default AppConfiguration;
