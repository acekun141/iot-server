import { DynamoDB } from "aws-sdk";

export const createTableConfig = {
    AttributeDefinitions: [
        {
            AttributeName: 'id',
            AttributeType: 'S'
        },
    ],
    KeySchema: [
        {
            AttributeName: 'id',
            KeyType: 'HASH'
        },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    },
    TableName: 'users'
}

export const updateTableConfig = {
    TableName: "users",
    AttributeDefinitions: [
        {AttributeName: "username", AttributeType: "S"}
    ],
    GlobalSecondaryIndexUpdates: [
        {
            Create: {
                IndexName: "username-index",
                KeySchema: [
                    { AttributeName: "username", KeyType: "HASH" }
                ],
                Projection: { ProjectionType: "ALL" },
                ProvisionedThroughput: {
                    ReadCapacityUnits: 1,
                    WriteCapacityUnits: 1
                }
            }
        }
    ]
}


export const generateExpression = (obj: any) => {
    return Object.keys(obj).reduce((current: string, key: string) => {
        if (!!current) {
            return `${current}, #${key} = :${key}`;
        }
        return `#${key} = :${key}`;
    }, "");
}


export const generateValues = (obj: any): any => {
    return Object.entries(obj).reduce((current: any, pair: any) => {
        current[`:${pair[0]}`] = DynamoDB.Converter.input(pair[1])
        return current
    }, {});
}


export const generateNames = (obj: any): any => {
    return Object.keys(obj).reduce((current: any, key: any) => {
        current[`#${key}`] = key;
        return current
    }, {});
}