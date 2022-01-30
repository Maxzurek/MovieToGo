import { ReactNode, useContext } from "react";
import { MediaContext } from "./MediaContext";

interface MediaProps {
    mobile?: boolean;
    tablet?: boolean;
    desktop?: boolean;
    children: ReactNode;
}

export default function Media(props: MediaProps) {

    const { isMobile, isTablet, isDesktop } = useContext(MediaContext);

    const renderChildren = () => {

        if (props.mobile && isMobile) {
            return props.children;
        }
        if (props.tablet && isTablet) {
            return props.children;
        }
        if (props.desktop && isDesktop) {
            return props.children;
        }

        return <></>;
    }

    return (
        <>
            {renderChildren()}
        </>
    )
};
