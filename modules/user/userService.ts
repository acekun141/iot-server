import { randomUUID } from "crypto";
import { IUser } from "../../utils/interfaces";
import Database from "../dynamodb/dynamodbClient";

class UserService {
    private dbClient = Database.client;

    public async getUserByUsername(username: string): Promise<Omit<IUser, "password"> | null> {
        const users = await this.dbClient.query({
            TableName: "users",
            IndexName: "username-index",
            KeyConditionExpression: "username = :u",
            ExpressionAttributeValues: {":u": {S: username}}
        }).promise();
        if (users.Items && users.Items.length > 0) {
            const user: any = users.Items[0];
            return {
                _id: user.id.S,
                username: user.username.S,
                hashPassword: user.hash_password.S,
                role: user.role.S,
                permission: user.permission.SS,
            }
        }
        return null;
    }


    public async getUserById(id: string) {
        const { Item: user }: any = await this.dbClient.getItem({
            TableName: "users",
            Key: {"id": {S: id}}
        }).promise()
        return {
            _id: user.id.S,
            username: user.username.S,
            hashPassword: user.hash_password.S,
            role: user.role.S,
            permission: user.permission.SS,
        };
    }


    public async addUser(payload: Omit<IUser, "password" | "_id"> & { hashPassword: string }) {
        const _id = randomUUID();
        await this.dbClient.putItem({
            Item: {
                "id": {S: _id},
                "username": {S: payload.username},
                "hash_password": {S: payload.hashPassword},
                "role": {S: payload.role},
                "permission": {SS: payload.permission},
            },
            TableName: "users"
        }).promise();
        return _id;
    }
}

export default UserService;