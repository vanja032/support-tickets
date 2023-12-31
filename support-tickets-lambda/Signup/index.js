const {createHash} = require("crypto");

const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient({region: "us-east-1"});
const hashl = 64;

const handler = async(event) => {
    try{
        // CHeck if all parameters are set
        if(!event.username || !event.email || !event.f_name || !event.l_name || !event.password_hash){
            throw new Error("Internal server error");
        }
        
        // Checking if the username already exists
        let params = {
            TableName: "users",
            IndexName: "username-email-index",
            KeyConditionExpression: "username = :username",
            ExpressionAttributeValues: {
                ":username": event.username.toString().trim()
            }
        };
        
        let result = await dynamo.query(params).promise();
        if(result.Items.length > 0){
            throw new Error("Error while inserting data into database");
        }
        
        // Checking if the email already exists
        params = {
            TableName: "users",
            IndexName: "email-index",
            KeyConditionExpression: "email = :email",
            ExpressionAttributeValues: {
                ":email": event.email.toString().trim()
            }
        };
        
        result = await dynamo.query(params).promise();
        if(result.Items.length > 0){
            throw new Error("Error while inserting data into database");
        }
        
        const password_hash = event.password_hash.toString().trim();
        
        if(password_hash.length != (3 * hashl)){
            throw new Error("Invalid password hash");
        }
        
        const dataHash = password_hash.substr(0, hashl);
        const tHash = password_hash.substr(password_hash.length / 3, hashl);
        const sumHash = password_hash.substr(password_hash.length / 3 * 2, hashl);
        const checkSum = `${parseInt(tHash, 16).toString(2)}${parseInt(dataHash, 16).toString(2)}`;
        
        if(createHash('sha256').update(checkSum.toString()).digest('hex') !== sumHash){
            throw new Error("Invalid password hash");
        }
        
        const user = {
            username: event.username.toString().trim(),
            email: event.email.toString().trim(),
            first_name: event.f_name.toString().trim(),
            last_name: event.l_name.toString().trim(),
            password_hash: `${dataHash}${tHash}`,
            profile: (event.profile) ? event.profile.toString().trim() : "",
            role: {
                description: "User support role",
                name: "user"
            },
            tickets: [],
            created: (new Date()).toISOString()
        };
        
        params = {
            TableName: "users",
            Item: user
        };
        
        await dynamo.put(params).promise();
        
        const response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", 
                "Content-Type": "application/json"
            },
            body: {
                success: {
                    message: "Successfully created user account"
                },
                status: true
            }
        };
        return response;
    }
    catch(error){
        const response = {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*", 
                "Content-Type": "application/json"
            },
            body: {
                error: {
                    message: "Internal server error"
                },
                status: false
            }
        };
        return response;
    }
};

module.exports = {handler};

