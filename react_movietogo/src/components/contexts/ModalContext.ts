import React from "react";

const ModalContext = React.createContext<{
    isAuthModalOpen: boolean;
    setAuthModalOpen(isAuthModalOpen: boolean): void;
    isOkMessageModalOpen: boolean;
    setOkMessageModalOpen(isOkMessageModalOpen: boolean): void;
    okMessageModalContent: string;
    setOkMessageModalContent(okMessageModalContent: string): void;
    displayAuthenticationModal(isOpen: boolean): void;
    displayOkMessage(content: string): void;
}>({
    isAuthModalOpen: false,
    setAuthModalOpen: () => { },
    isOkMessageModalOpen: false,
    setOkMessageModalOpen: () => { },
    okMessageModalContent: 'PLACEHOLDER',
    setOkMessageModalContent: () => { },
    displayAuthenticationModal: () => { },
    displayOkMessage: () => { },
});

export default ModalContext;