import { ReactElement, useContext, useEffect, useState } from "react";
import AuthenticationContext from "../contexts/AuthenticationContext";

interface AuthorizedProps{
    authorized: ReactElement;
    notAuthorized?: ReactElement;
    role?: string;
}

export default function Authorized(props: AuthorizedProps) {

    const {claims} = useContext(AuthenticationContext);

    const [isAuthorized, setIsAuthorized] = useState(false);

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
