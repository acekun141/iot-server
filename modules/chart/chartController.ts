import { Response, NextFunction, Request } from "express";
import _ from "lodash";
import ChartService from "./chartService";


class ChartController {
    private chartService = new ChartService();
    public getSensorData = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const currentTime = new Date()
            const data = await this.chartService.querySensorData({ to_date: currentTime.getTime() , topic: "topic_2" })
            res.json({ data });
        } catch (error) {
            next(error);
        }
    }
}

export default ChartController;