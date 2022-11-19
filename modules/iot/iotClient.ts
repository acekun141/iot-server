import AWSIoT from "aws-iot-device-sdk";
import config from "../../utils/configs";
import DeviceService from "../device/deviceService";
import Database from "../dynamodb/dynamodbClient";
import _ from "lodash"
import { app } from "../..";
import { Iot } from "aws-sdk";

class IoT {
    private static Client: AWSIoT.thingShadow = new AWSIoT.thingShadow({
        keyPath: config.IOT_KEYPATH,
        certPath: config.IOT_CERTPATH,
        caPath: config.IOT_CAPATH,
        clientId: config.IOT_CLIENTID,
        host: config.IOT_HOST,
    });

    private static topicForSubscribe = "$aws/things/+/shadow/update/documents";
    private static sensorTopic = "topic_2";

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
            IoT.subscribeTopic(IoT.sensorTopic);
            IoT.Client.on("message", (topic, payload) => {
                if (topic == IoT.sensorTopic) {
                    app.io.emit(config.SENSOR_EVENT, JSON.parse(payload.toString()))
                } else {
                    const device = topic.split("$aws/things/")[1].split("/shadow/update")[0];
                    const jsonPayload = JSON.parse(payload.toString());
                    deviceService.updateDeviceState(device, _.get(jsonPayload, "current.state.desired"))
                    app.io.emit(config.SOCKET_DEVICE_CHANGE_EVENT, {"message": "update state"})
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default IoT;
