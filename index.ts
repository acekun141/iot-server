import dotenv from "dotenv";
import App from "./app";

dotenv.config();

export const app = new App();
app.listen();