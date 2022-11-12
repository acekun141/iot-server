import { Router } from "express";
import { validation } from "../../utils/middlewares";
import DeviceController from "./deviceController";
import { UpdateColorDTO } from "./deviceDTO";


class DeviceRouter {
    public path = "/device";
    public router = Router();
    private controller = new DeviceController();

    constructor() {
        this.initializeRoute();
    }

    private initializeRoute() {
        this.router.put(`${this.path}/color`, validation(UpdateColorDTO), this.controller.changeColor) // TODOS: must have auth
    }
}

export default DeviceRouter;
