import { Response } from "express";

export interface IUser {
    _id: string;
    username: string;
    password: string;
    hashPassword: string;
    role: string;
    permission: string[];
}


export interface AuthResponse extends Response {
    locals: {
        user: Omit<IUser, "password">
    }
}