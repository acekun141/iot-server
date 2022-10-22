import { Request, Response, NextFunction } from "express";
import AuthService from "./authService";


class AuthController {
    private service = new AuthService();    


    public login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accessToken = await this.service.login(req.body)
            return res.json({ token: accessToken })
        } catch (error) {
            next(error);
        }
    }


    public register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = await this.service.register(req.body);
            return res.json({ userId });
        } catch (error) {
            next(error)
        }
    }
}

export default AuthController;