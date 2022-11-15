import IoT from "../iot/iotClient";

class DeviceService {
    private IoTClient = IoT;

    private getTopicName(): string {
        return "$aws/things/ESP32/shadow/update"
    }

    public async updateDeviceProperty(device: string, property: string, value: any) {
        this.IoTClient.publishTopic(
            this.getTopicName(),
            JSON.stringify({state: { [property]: value }})
        )
    }
    
    // public async subcribeDeviceProperty(device: string, property: string,)
}

export default DeviceService;
