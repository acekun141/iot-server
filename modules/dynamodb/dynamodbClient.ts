import AWS from "aws-sdk";
import config from "../../utils/configs";
import { createTableConfig, updateTableConfig } from "./dynamodbUtils";

class Database {
    static client: AWS.DynamoDB = new AWS.DynamoDB({
        region: config.AWS_REGION,
        endpoint: config.AWS_LOCAL_ENDPOINT
    });


    public static async initDatabase() {
        const tables = await Database.client.listTables().promise();
        if (tables.TableNames && tables.TableNames.length > 0) return;
        console.log('[CREATE USER TABLE]')
        await Database.client.createTable(createTableConfig).promise();
        await Database.client.updateTable(updateTableConfig).promise();
        console.log('[CREATE USER TABLE SUCCESS]')
    }
}

export default Database;