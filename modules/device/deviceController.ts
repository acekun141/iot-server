import { Response, NextFunction, Request } from "express";
import _ from "lodash";
import { AuthResponse } from "../../utils/interfaces";
import DeviceService from "./deviceService";


class DeviceController {
    private service = new DeviceService();
    public updateState = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deviceCode = req.body.deviceCode;
            const desired = req.body.desired;
            this.service.updateDeviceProperty(deviceCode, "desired", desired);
            return res.json({ "status": "published" })
        } catch (error) {
            next(error)
        }
    }

    public updateDevice = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { deviceCode, property } = req.body;
            await this.service.updateDevice(deviceCode, _.pickBy(property, _.identity));
            return res.json({ "deviceCode": deviceCode })
        } catch (error) {
            next(error)
        }
    }

    public addDevice = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, code } = req.body;
            const device_code = await this.service.addDevice({ name, code });
            return res.json({ "code": device_code })
        } catch (error) {
            next(error);
        }
    }

    public getDevices = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const devices = await this.service.getAllDevices();
            return res.json({ devices })
        } catch (error) {
            next(error)
        }
    }
}


export default DeviceController;
