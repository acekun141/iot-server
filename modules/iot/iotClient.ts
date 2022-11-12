import AWSIoT from "aws-iot-device-sdk";
import path from "path";
import config from "../../utils/configs";

class IoT {
    private static Client: AWSIoT.thingShadow = new AWSIoT.thingShadow({
        keyPath: path.resolve(__dirname, "../../CAkeys/ESP32.private.key"),
        certPath: path.resolve(__dirname, "../../CAkeys/ESP32.cert.pem"),
        caPath: path.resolve(__dirname, "../../CAkeys/root-CA.crt"),
        clientId: "Classic Shadow",
        host: "a2djzgcol29dkm-ats.iot.ap-southeast-1.amazonaws.com",
    });

    static publishTopic = async (topicName: string, content: any) => {
        IoT.Client.publish(topicName, content)
    }
}

export default IoT;