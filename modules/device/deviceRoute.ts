import { Router } from "express";
import { validation } from "../../utils/middlewares";
import DeviceController from "./deviceController";
import { AddDeviceDTO, UpdateDesiredDTO } from "./deviceDTO";


class DeviceRouter {
    public path = "/device";
    public router = Router();
    private controller = new DeviceController();

    constructor() {
        this.initializeRoute();
    }

    private initializeRoute() {
        this.router.put(`${this.path}`, validation(UpdateDesiredDTO), this.controller.updateState) // TODOS: must have auth
        this.router.post(`${this.path}`, validation(AddDeviceDTO), this.controller.addDevice) // TODOS: must have auth
        this.router.get(`${this.path}`, this.controller.getDevices) // TODOS: must have auth vaiu loz
    }
}

export default DeviceRouter;
