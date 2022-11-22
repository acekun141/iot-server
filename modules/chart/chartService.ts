import { DynamoDB } from "aws-sdk";
import Database from "../dynamodb/dynamodbClient";

class ChartService {
    private dbClient = Database.client;

    public async querySensorData({ from_date, to_date, topic }: { from_date?: number, to_date:number, topic: string }) {
        const queryParam: DynamoDB.QueryInput = {
            TableName: "sensor_data",
            KeyConditionExpression: "#topic = :topic AND #sample_time <= :to_date",
            ExpressionAttributeValues: {
                ":topic": DynamoDB.Converter.input(topic),
                ":to_date": DynamoDB.Converter.input(to_date)
            },
            ExpressionAttributeNames: {"#topic": "topic", "#sample_time": "sample_time"},
            Limit: 50,
            ScanIndexForward: false,
        }
        const { Items: datas } = await this.dbClient.query(queryParam).promise();
        if (!!datas) {
            return datas.map(data => DynamoDB.Converter.unmarshall(data));
        }
        return []
    }
}


export default ChartService;