import React from "react";

const ModalContext = React.createContext<{
    isAuthModalOpen: boolean;
    setAuthModalOpen(isAuthModalOpen: boolean):void;
}>({
    isAuthModalOpen: false, 
    setAuthModalOpen: ()=> {},
});

export default ModalContext;