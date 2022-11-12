import IoT from "../iot/iotClient";

class DeviceService {
    private IoTClient = IoT;

    private getTopNameByType(device: string, type: string) {
        return `${type}-${device}`
    }

    public async updateDeviceProperty(device: string, property: string, value: any) {
        this.IoTClient.publishTopic(
            this.getTopNameByType(device, "update"),
            JSON.stringify({
                [property]: value
            })
        )
    }
}

export default DeviceService;
