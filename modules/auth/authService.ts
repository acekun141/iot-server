import bcrypt from "bcrypt";
import config, { errors } from "../../utils/configs";
import { HttpException } from "../../utils/exceptions";
import { IUser } from "../../utils/interfaces";
import jwt from "jsonwebtoken";
import { userPermisison, userRole } from "../user/userUtils";
import UserService from "../user/userService";

class AuthService {
    private userService = new UserService();

    private async hashPassword(password: string): Promise<string> {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    }


    private async comparePassword(passwordHash: string, password: string): Promise<boolean> {
        const isValid = await bcrypt.compare(password, passwordHash);
        return isValid
    }


    private generateJWT(userId: string): string {
        const accessToken = jwt.sign(
            { _id: userId },
            config.SECRET,
            { expiresIn: config.JWTLIFE }
        )
        return accessToken;
    }


    public async login(payload: Pick<IUser, "username" | "password">) {
        const user = await this.userService.getUserByUsername(payload.username);
        if (!user) {
            throw new HttpException(400, errors.IVALID_IDENTIFY);
        }
        console.log('user', user);
        const isValid = await this.comparePassword(user.hashPassword, payload.password);
        if (!isValid) {
            throw new HttpException(400, errors.IVALID_IDENTIFY)
        }
        const accessToken = this.generateJWT(user._id);
        return accessToken
    }


    public async register(payload: Pick<IUser, "username" | "password">) {
        const userPayload = {
            username: payload.username,
            hashPassword: await this.hashPassword(payload.password),
            role: userRole.ADMIN,
            permission: [userPermisison.DEFAULT],
        }
        const existedUser = await this.userService.getUserByUsername(payload.username);
        if (!!existedUser) {
            throw new HttpException(400, errors.USER_EXISTED);
        }
        const userId = this.userService.addUser(userPayload);
        return userId
    }
}

export default AuthService;