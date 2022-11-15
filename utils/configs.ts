import path from "path";
import dotenv from "dotenv"
dotenv.config();

const config = {
    PORT: process.env.PORT || "5002",
    SECRET: process.env.SECRET || "dev",
    JWTLIFE: Number.parseInt(process.env.JWTLIFE || "14400"), // 1 days

    AWS_REGION: process.env.AWS_REGION,
    AWS_SECRET_ID: process.env.AWS_SECRET_ID,
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,

    IOT_KEYPATH: path.resolve(__dirname, "../CAkeys", process.env.IOT_KEYPATH || ""),
    IOT_CERTPATH: path.resolve(__dirname, "../CAkeys", process.env.IOT_CERTPATH || ""),
    IOT_CAPATH: path.resolve(__dirname, "../CAkeys", process.env.IOT_CAPATH || ""),
    IOT_CLIENTID: process.env.IOT_CLIENTID,
    IOT_HOST: process.env.IOT_HOST,
}

export const errors = {
    UNAUTHORIZED: "unauthorized",
    IVALID_IDENTIFY: "username or password is incorrect",
    USER_EXISTED: "user is existed",
}

export default config;