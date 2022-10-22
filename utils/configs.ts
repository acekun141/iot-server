const config = {
    PORT: process.env.PORT || "5002",
    SECRET: process.env.SECRET || "dev",
    JWTLIFE: 600 * 24, // 1 days

    AWS_REGION: "local",
    AWS_SECRET_ID: "<aws_secret_id>",
    AWS_LOCAL_ENDPOINT: "http://localhost:8000",
}

export const errors = {
    UNAUTHORIZED: "unauthorized",
    IVALID_IDENTIFY: "username or password is incorrect",
    USER_EXISTED: "user is existed",
}

export default config;