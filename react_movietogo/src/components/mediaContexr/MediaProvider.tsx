import { ReactNode, useEffect, useState } from "react"
import { MediaContext } from "./MediaContext";

interface MediaProviderProps {
    children: ReactNode;
    /** Maximum width breakpoint for mobile media. 
     * Changing this value will also change the minimum width breakpoint for tablet media.
     * Value must be greater than 320 */
    mobileBreakPoint?: number;
     /** Minimum width breakpoint for desktop media. 
      * Changing this value will also change the maximum width breakpoint for tablet media */
    desktopBreakPoint?: number;
}

MediaProvider.defaultProps = {
    mobileBreakPoint: 768,
    desktopBreakPoint: 1024
}

export default function MediaProvider(props: MediaProviderProps) {

    const [isMobile, setMobile] = useState(false);
    const [isTablet, setTablet] = useState(false);
    const [isDesktop, setDesktop] = useState(false);

    const setMediaType = () => {

        let viewWidth = window.innerWidth;

        let isMobile = viewWidth < props.mobileBreakPoint!;
        let isTablet = viewWidth >= props.mobileBreakPoint! && viewWidth < props.desktopBreakPoint!;
        let isDesktop = viewWidth >= props.desktopBreakPoint!;

        setMobile(isMobile);
        setTablet(isTablet);
        setDesktop(isDesktop)
    };

    useEffect(() => {

        window.addEventListener("resize", setMediaType);
        setMediaType();

        return () => window.removeEventListener("resize", setMediaType);
    });

    return (
        <MediaContext.Provider value={{
            isMobile: isMobile,
            setMobile: setMobile,
            isTablet: isTablet,
            setTablet: setTablet,
            isDesktop: isDesktop,
            setDesktop: setDesktop
        }}>
            {props.children}
        </MediaContext.Provider>
    )
};
