import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import config, { errors } from "./configs";
import { HttpException } from "./exceptions";
import jwt from "jsonwebtoken";
import { AuthToken } from "./token";
import UserService from "../modules/user/userService";


export const validation = (schema: Joi.Schema) => {
    const options: Joi.AsyncValidationOptions = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    }
    return (req: Request, res: Response, next: NextFunction) => {
        const { error, value } = schema.validate(req.body, options);
        if (error) {
            return next(new HttpException(400, error.details.map(x => x.message).join(', ')));
        }
        req.body = value;
        return next();
    }
}


export const exceptionHandler = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    const status = error.status || 500;
    const message = error.message || "Something went wrong. Please contact admin for support";
    res.status(status).json({ error: message })
}


export const authHandler = async (req: Request, res: Response, next: NextFunction) => {
    const userService = new UserService();
    const headers = req.headers;
    if (!headers || !headers.authorization) {
        return next(new HttpException(401, errors.UNAUTHORIZED));
    }
    try {
        const verifyToken = jwt.verify(headers.authorization.split(" ")[1], config.SECRET) as AuthToken;
        const id = verifyToken._id;
        const user = await userService.getUserById(id);
        if (!user) throw new HttpException(401, errors.UNAUTHORIZED);
        res.locals.user = user;
        return next();

    } catch (error) {
        console.log(error);
        return next(new HttpException(401, errors.UNAUTHORIZED));
    }
}