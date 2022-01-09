export interface Claim{
    name: string;
    value: string;
}

export interface AuthenticationResponse{
    token: string;
    tokenExpiration: Date;
}

export interface UserLoginDTO{
    emailOrUserName: string;
    password: string;
}

export interface UserCreationDTO{
    userName: string;
    password: string;
    confirmPassword: string;
    email: string;
}