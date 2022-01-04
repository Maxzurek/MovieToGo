import { ReactElement, useContext, useEffect, useState } from "react";
import AuthenticationContext from "./AuthenticationContext";

interface AuthorizedProps{
    authorized: ReactElement;
    notAuthorized?: ReactElement;
    role?: string;
}

export default function Authorized(props: AuthorizedProps) {

    const [isAuthorized, setIsAuthorized] = useState(false);
    const {claims} = useContext(AuthenticationContext);

    useEffect(()=>{
        if(props.role){
            const index = claims.findIndex(claim => claim.name === 'role' && claim.value === props.role);

            setIsAuthorized(index > -1);
        }
        else{
            setIsAuthorized(claims.length > 0);
        }
    }, [claims, props.role])

    return(
        <>
            {isAuthorized ? props.authorized : props.notAuthorized}
        </>
    )
};
