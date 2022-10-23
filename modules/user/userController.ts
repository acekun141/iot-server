import { Response, NextFunction, Request } from "express";
import { AuthResponse } from "../../utils/interfaces";


class UserController {
    public getDetail(req: Request, res: AuthResponse, next: NextFunction) {
        try {
            const { username, role, permission, _id: id } = res.locals.user;
            res.json({ username, role, permission, id });
        } catch (error) {
            next(error);
        }
    }
}


export default UserController;