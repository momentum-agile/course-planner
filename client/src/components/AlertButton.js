import React from "react";
import {
    Button,
    AlertDialog,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    IconButton,
} from "@chakra-ui/core";

const AlertButton = ({ itemType, itemName, action, navigateTo, confirmFn }) => {
    const [isOpen, setIsOpen] = React.useState();
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef();

    return (
        <>
            <IconButton icon="delete" variantColor="red" size="lg" onClick={() => setIsOpen(true)} />
            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        {action} {itemType}
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Are you sure you want to {action && action.toLowerCase()} {itemName}? You can't undo this action afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            variantColor="red"
                            onClick={() => {
                                onClose();
                                confirmFn();
                            }}
                            ml={3}
                        >
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default AlertButton;
