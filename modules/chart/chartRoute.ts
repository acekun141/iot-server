import { Router } from "express";
import { validation } from "../../utils/middlewares";
import ChartController from "./chartController";


class ChartRouter {
    public path = "/chart";
    public router = Router();
    private controller = new ChartController();

    constructor() {
        this.initializeRoute();
    }

    private initializeRoute() {
        this.router.get(`${this.path}/sensor`, this.controller.getSensorData) // TODOS: must have auth
    }
}

export default ChartRouter;

