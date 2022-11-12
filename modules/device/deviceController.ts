import { Response, NextFunction, Request } from "express";
import { AuthResponse } from "../../utils/interfaces";
import DeviceService from "./deviceService";


class DeviceController {
    private service = new DeviceService();
    public changeColor = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deviceName = req.body.name;
            const color = req.body.color;
            this.service.updateDeviceProperty(deviceName, "color", color);
            return res.json({ "status": "published" })
        } catch (error) {
            next(error)
        }
    }
}


export default DeviceController;
