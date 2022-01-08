export interface claim{
    name: string;
    value: string;
}

export interface UserLoginDTO{
    email: string;
    password: string;
}

export interface UserCreationDTO{
    userName: string;
    password: string;
    confirmPassword: string;
    email: string;
    firstName: string;
    lastName: string;
}