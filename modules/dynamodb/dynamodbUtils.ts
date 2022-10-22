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