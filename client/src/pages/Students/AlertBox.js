import React from "react";
import {
    Button,
    AlertDialog,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
} from "@chakra-ui/core";

const AlertButton = ({ btnText, confirmFn }) => {
    const [isOpen, setIsOpen] = React.useState();
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef();

    return (
        <>
            <Button variantColor="red" onClick={() => setIsOpen(true)}>
                {btnText}
            </Button>

            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        {btnText}
                    </AlertDialogHeader>

                    <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

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
