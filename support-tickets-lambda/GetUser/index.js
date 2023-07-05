const {createHash} = require("crypto");
const jwt = require("jsonwebtoken");

const key = createHash('sha256').update("mykey").digest('hex');

const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient({region: "us-east-1"});


const handler = async(event, context) => {
    try{
        // CHeck if all parameters are set
        if(!event.token){
            throw new Error("Internal server error");
        }
        
        const token = jwt.verify(event.token, key);
        const username = token.username.toString().trim();
        
        // Checking if the account with username exists
        let params = {
            TableName: "users",
            IndexName: "username-email-index",
            KeyConditionExpression: "username = :username",
            ExpressionAttributeValues: {
                ":username": username
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
                    ":email": username
                }
            };
            
            result = await dynamo.query(params).promise();
        }
        
        if(result.Items.length == 0){
            throw new Error("Error during user login");
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
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": "true"
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
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": "true"
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

