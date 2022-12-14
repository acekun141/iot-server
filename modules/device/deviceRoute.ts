import { Router } from "express";
import { validation } from "../../utils/middlewares";
import DeviceController from "./deviceController";
import { UpdateDesiredDTO } from "./deviceDTO";


class DeviceRouter {
    public path = "/device";
    public router = Router();
    private controller = new DeviceController();

    constructor() {
        this.initializeRoute();
    }

    private initializeRoute() {
        this.router.put(`${this.path}`, validation(UpdateDesiredDTO), this.controller.updateState) // TODOS: must have auth
    }
}

export default DeviceRouter;
