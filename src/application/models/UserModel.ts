export interface CreateUser {
    name?: string;
    email?: string;
    password?: string;
    passwordConfirmation?: string;
    role?: string;
    mobileNumber?: string;
}

export interface User {
    id:string;
    name: string;
    email: string;
    role: string;
    mobileNumber?: string;
}