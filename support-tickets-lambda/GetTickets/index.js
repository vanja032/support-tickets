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
        
        if(result.Items.length == 0 || result.Items[0].role["name"].toLowerCase() != "admin"){
            throw new Error("Error during user authentication");
        }
        
        // Fetch all tickets from all users
        params = {
            TableName: "users"
        };
        
        result = await dynamo.scan(params).promise();
        
        var tickets = {};
        for(const item in result.Items){
            tickets[result.Items[item].username] = {
                username: result.Items[item].username,
                email: result.Items[item].email,
                f_name: result.Items[item].first_name,
                l_name: result.Items[item].last_name,
                profile: result.Items[item].profile,
                role: result.Items[item].role,
                tickets: result.Items[item].tickets,
                created: result.Items[item].created,
            };
        }
        
        const response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", 
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": "true"
            },
            body: {
                success: {
                    message: "Successfully retreived data"
                },
                tickets: tickets,
                status: true
            }
        };
        return response;
    }
    catch(errorr){
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
