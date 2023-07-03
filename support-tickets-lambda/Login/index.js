const {createHash} = require("crypto");
const jwt = require("jsonwebtoken");

const key = createHash('sha256').update("mykey").digest('hex');

const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient({region: "us-east-1"});
const hashl = 64;

const handler = async(event) => {
    try{
        // Checking if the account with username exists
        let params = {
            TableName: "users",
            IndexName: "username-email-index",
            KeyConditionExpression: "username = :username",
            ExpressionAttributeValues: {
                ":username": event.username.toString().trim()
            }
        };
        
        var result = await dynamo.query(params).promise();
        if(result.Items.length == 0){
            // Checking if the account with email exists
            params = {
                TableName: "users",
                IndexName: "email-index",
                KeyConditionExpression: "email = :email",
                ExpressionAttributeValues: {
                    ":email": event.username.toString().trim()
                }
            };
            
            result = await dynamo.query(params).promise();
        }
        
        if(result.Items.length == 0){
            throw new Error("Error during user logina");
        }
        
        const password_hash = event.password_hash.toString().trim();
        
        const userHash = result.Items[0].password_hash;
        
        const dataHash = userHash.substr(0, hashl);
        const tHash = userHash.substr(hashl, hashl);
        const hash = createHash('sha256').update(`${password_hash}${tHash}`).digest('hex')
        
        if(hash !== dataHash){
            throw new Error("Error during user loginb");
        }
        
        const user = {
            username: result.Items[0].username,
            email: result.Items[0].email,
            f_name: result.Items[0].first_name,
            l_name: result.Items[0].last_name,
            profile: result.Items[0].profile,
            role: result.Items[0].role,
            tickets: result.Items[0].tickets,
            created: result.Items[0].created,
            token: jwt.sign({username: result.Items[0].username}, key, { expiresIn: "24h" })
        };
        
        const response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", 
                "Content-Type": "application/json"
            },
            body: {
                success: {
                    message: "Successfully logged into user account"
                },
                user_data: user,
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
