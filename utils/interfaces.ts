export interface IUser {
    _id: string;
    username: string;
    password: string;
    hashPassword: string;
    role: string;
    permission: string[];
}