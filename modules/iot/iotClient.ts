import AWSIoT from "aws-iot-device-sdk";
import config from "../../utils/configs";

class IoT {
    private static Client: AWSIoT.thingShadow = new AWSIoT.thingShadow({
        keyPath: config.IOT_KEYPATH,
        certPath: config.IOT_CERTPATH,
        caPath: config.IOT_CAPATH,
        clientId: config.IOT_CLIENTID,
        host: config.IOT_HOST,
    });

    private static topicForSubscribe = "$aws/things/ESP32/shadow/update";

    static publishTopic = async (topicName: string, content: any) => {
        IoT.Client.publish(topicName, content);
    }

    static subscribeTopic = (topicName: string) => {
        IoT.Client.subscribe(topicName,);
    }

    static initSocketConnection = () => {
        IoT.subscribeTopic(IoT.topicForSubscribe);
        IoT.Client.on("message", (topic, payload) => {
            console.log(topic, payload.toString())
            console.log(JSON.parse(payload.toString()))
        })
    }
}

export default IoT;