import React from "react";

const ModalContext = React.createContext<{
    isAuthModalOpen: boolean;
    setAuthModalOpen(isAuthModalOpen: boolean): void;
    isOkMessageModalOpen: boolean;
    setOkMessageModalOpen(isOkMessageModalOpen: boolean): void;
    okMessageModalContent: string;
    setOkMessageModalContent(okMessageModalContent: string): void;
}>({
    isAuthModalOpen: false,
    setAuthModalOpen: () => { },
    isOkMessageModalOpen: false,
    setOkMessageModalOpen: () => { },
    okMessageModalContent: 'PLACEHOLDER',
    setOkMessageModalContent: () => { },
});

export default ModalContext;