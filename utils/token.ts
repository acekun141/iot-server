import { Request } from "express";
import { IUser } from "./interfaces";

export interface AuthToken {
    _id: string;
}

export interface AuthRequest extends Request {
    user: Omit<IUser, "password">;
}