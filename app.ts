import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import AuthRouter from "./modules/auth/authRouter";
import config from "./utils/configs";
import { exceptionHandler } from "./utils/middlewares";
import Database from "./modules/dynamodb/dynamodbClient";
import UserRouter from "./modules/user/userRouter";
import DeviceRouter from "./modules/device/deviceRoute";
import IoT from "./modules/iot/iotClient";
import { Server } from "socket.io";
import http from "http"


class App {
    public app: express.Application;
    public server: any;
    public io: Server;


    constructor() {
        this.app = express();
        this.initMiddleware();
        this.initRouter();
        this.server = http.createServer(this.app);
        this.io = new Server(this.server, { cors: { origin: "*" }});
        this.io.on("connection", (socket) => {
            console.log(socket.id)
        })
    }


    private initMiddleware() {
        this.app.use(bodyParser.json());
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(morgan("dev"))
    }


    private initRouter() {
        const routers = [new AuthRouter(), new UserRouter(), new DeviceRouter()]
        routers.map(({ router }) => this.app.use(router));
        this.app.use(exceptionHandler)
    }


    public listen() {
        IoT.initSocketConnection()
        Database.initDatabase()
        this.server.listen({ port: config.PORT }, () => {
            console.log(`[SERVER] server running at port ${config.PORT}`)
        })
    }
}

export default App;