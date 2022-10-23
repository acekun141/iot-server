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


class App {
    public app: express.Application;


    constructor() {
        this.app = express();
        this.initMiddleware();
        this.initRouter();
    }


    private initMiddleware() {
        this.app.use(bodyParser.json());
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(morgan("dev"))
    }


    private initRouter() {
        const routers = [new AuthRouter(), new UserRouter()]
        routers.map(({ router }) => this.app.use(router));
        this.app.use(exceptionHandler)
    }


    public listen() {
        Database.initDatabase()
        this.app.listen({ port: config.PORT }, () => {
            console.log(`[SERVER] server running at port ${config.PORT}`)
        })
    }
}

export default App;