import { Router } from "express"
import { validation } from "../../utils/middlewares";
import AuthController from "./authController";
import { LoginDTO, RegisterDTO } from "./authDTO";

class AuthRouter {
    public path = "/auth";
    public router = Router();
    private controller = new AuthController();

    constructor() {
        this.initializeRoute();
    }

    private initializeRoute() {
        this.router.post(`${this.path}/login`, validation(LoginDTO), this.controller.login)
        this.router.post(`${this.path}/register`, validation(RegisterDTO), this.controller.register)
    }
}

export default AuthRouter;