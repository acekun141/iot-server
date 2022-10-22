import { Response, NextFunction } from "express";
import { AuthRequest } from "../../utils/token";


class UserController {
    public getDetail(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { username, role, permission, _id: id } = req.user;
            return { username, role, permission, id };
        } catch (error) {
            next(error);
        }
    }
}


export default UserController;