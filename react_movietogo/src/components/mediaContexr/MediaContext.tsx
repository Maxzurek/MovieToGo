import { createContext } from "react";

export const MediaContext = createContext<{
    isMobile: boolean;
    setMobile(isMobile: boolean): void;
    isTablet: boolean;
    setTablet(isTablet: boolean): void;
    isDesktop: boolean;
    setDesktop(isDesktop: boolean): void;
}>({
    isMobile: false,
    setMobile: ()=>{},
    isTablet: false,
    setTablet: ()=>{},
    isDesktop: false,
    setDesktop: ()=>{},
})