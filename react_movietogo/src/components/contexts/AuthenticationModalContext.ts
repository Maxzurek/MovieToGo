import React from "react";

export const AUTHENTICATION_MODAL = 'authenticationModal';

const AuthenticationModalContext = React.createContext<{
    isAuthModalOpen: boolean;
    setAuthModalOpen(isAuthModalOpen: boolean):void
}>({isAuthModalOpen: false, setAuthModalOpen: ()=> {}});

export default AuthenticationModalContext;