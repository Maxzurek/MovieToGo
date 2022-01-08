import React from "react";
import { Claim } from "../../models/authentication.models";

const AuthenticationContext = React.createContext<{
    claims: Claim[];
    update(claims: Claim[]):void
}>({claims: [], update: ()=> {}});

export default AuthenticationContext;