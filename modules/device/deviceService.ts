import { DynamoDB } from "aws-sdk";
import Database from "../dynamodb/dynamodbClient";
import IoT from "../iot/iotClient";

class DeviceService {
    private dbClient = Database.client;
    private IoTClient = IoT;

    private getTopicName(deviceCode: string): string {
        return `$aws/things/${deviceCode}/shadow/update`
    }

    public async updateDeviceProperty(device: string, property: string, value: any) {
        this.IoTClient.publishTopic(
            this.getTopicName(device),
            JSON.stringify({state: { [property]: value }})
        )
    }

    public async addDevice(payload: { name: string, code: string }) {
        await this.dbClient.putItem({
            Item: {
                "code": {S: payload.code},
                "name": {S: payload.name},
            },
            TableName: "devices",
            ConditionExpression: "attribute_not_exists(code)"
        }).promise();
        return payload.code;
    }

    public async getAllDevices() {
        const params: DynamoDB.ScanInput = {TableName: "devices"}
        const result: DynamoDB.ScanOutput = await this.dbClient.scan(params).promise()
        const { Items: devices } = result
        return (devices || []).map((device: any) => DynamoDB.Converter.unmarshall(device));
    }

    public async updateDeviceState(deviceCode: string, state: any) {
        const params: DynamoDB.UpdateItemInput = {
            TableName: "devices",
            Key: {code: {S: deviceCode}},
            UpdateExpression: "SET #desired = :desired",
            ExpressionAttributeValues: {":desired": DynamoDB.Converter.input(state.desired)},
            ExpressionAttributeNames: {"#desired": "desired"}
        }
        await this.dbClient.updateItem(params).promise();
        return deviceCode
    }
}

export default DeviceService;
