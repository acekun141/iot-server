import { Response, NextFunction, Request } from "express";
import { AuthResponse } from "../../utils/interfaces";
import DeviceService from "./deviceService";


class DeviceController {
    private service = new DeviceService();
    public updateState = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deviceName = req.body.name;
            const desired = req.body.desired;
            this.service.updateDeviceProperty(deviceName, "desired", desired);
            return res.json({ "status": "published" })
        } catch (error) {
            next(error)
        }
    }
}


export default DeviceController;
