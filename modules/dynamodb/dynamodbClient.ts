import _ from "lodash";
import AWS from "aws-sdk";
import config from "../../utils/configs";
import { createTableConfig, updateTableConfig } from "./dynamodbUtils";

class Database {
    static client: AWS.DynamoDB = new AWS.DynamoDB({
        region: config.AWS_REGION,
        accessKeyId: config.AWS_SECRET_ID,
        secretAccessKey: config.AWS_SECRET_KEY
    });


    public static async initDatabase() {
        // const tables = await Database.client.listTables().promise();
        // const tableNames = _.get(tables, 'TableNames', [])
        // if (_.includes(tableNames, "users")) return;
        // await Database.client.createTable(createTableConfig).promise();
        // await Database.client.updateTable(updateTableConfig).promise();
    }
}

export default Database;