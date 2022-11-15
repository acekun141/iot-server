import AWSIoT from "aws-iot-device-sdk";
import config from "../../utils/configs";
import DeviceService from "../device/deviceService";
import Database from "../dynamodb/dynamodbClient";

class IoT {
    private static Client: AWSIoT.thingShadow = new AWSIoT.thingShadow({
        keyPath: config.IOT_KEYPATH,
        certPath: config.IOT_CERTPATH,
        caPath: config.IOT_CAPATH,
        clientId: config.IOT_CLIENTID,
        host: config.IOT_HOST,
    });

    private static topicForSubscribe = "$aws/things/+/shadow/update";

    static publishTopic = async (topicName: string, content: any) => {
        IoT.Client.publish(topicName, content);
    }

    static subscribeTopic = (topicName: string) => {
        IoT.Client.subscribe(topicName,);
    }

    static initSocketConnection = () => {
        try {
            const deviceService = new DeviceService();
            IoT.subscribeTopic(IoT.topicForSubscribe);
            IoT.Client.on("message", (topic, payload) => {
                const device = topic.split("$aws/things/")[1].split("/shadow/update")[0];
                deviceService.updateDeviceState(device, JSON.parse(payload.toString()).state)
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default IoT;