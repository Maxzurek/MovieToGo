import { AuthenticationResponse, Claim } from "../../models/authentication.models";

const TOKEN_KEY = 'token';
const EXPIRATION_KEY = 'tokenExpiration'

export const saveToken = (authenticationResponse: AuthenticationResponse) => {
    localStorage.setItem(TOKEN_KEY, authenticationResponse.token);
    localStorage.setItem(EXPIRATION_KEY, authenticationResponse.tokenExpiration.toString());
};

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};


export const getClaims = (): Claim[] => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) {
        return []
    }

    const tokenExpiration = localStorage.getItem(EXPIRATION_KEY)!;
    const expirationDate = new Date(tokenExpiration);

    if (expirationDate <= new Date()) {
        logout();
        return []; // expired token
    }

    const tokenData = JSON.parse(atob(token.split('.')[1]));
    const claims: Claim[] = [];

    for (const property in tokenData) {
        claims.push({ name: property, value: tokenData[property] });
    }

    return claims
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EXPIRATION_KEY);
};

