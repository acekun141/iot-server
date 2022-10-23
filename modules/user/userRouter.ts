import { Router } from "express";
import { authHandler } from "../../utils/middlewares";
import UserController from "./userController";


class UserRouter {
    public path = "/user";
    public router = Router();
    private controller = new UserController();

    constructor() {
        this.initializeRoute();
    }

    private initializeRoute() {
        this.router.get(`${this.path}`, authHandler, this.controller.getDetail)
    }
}

export default UserRouter;