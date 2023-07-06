const {createHash} = require("crypto");
const jwt = require("jsonwebtoken");

const key = createHash('sha256').update("mykey").digest('hex');

const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient({region: "us-east-1"});

const default_tag = "#default_tag";

const handler = async(event, context) => {
    try{
        // CHeck if all parameters are set
        if(!event.token || !event.ticket_header || !event.ticket_message){
            throw new Error("Internal server error");
        }
        
        const token = jwt.verify(event.token, key);
        let username = token.username.toString().trim();
        
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
        
        // Appending the ticket to user tickets
        username = result.Items[0].username;
        const email = result.Items[0].email;
        const created = (new Date()).toISOString();
        const header = event.ticket_header.toString().trim();
        const message = event.ticket_message.toString().trim();
        const tags = (event.tags) ? event.tags : [default_tag];
        
        params = {
            TableName: "users",
            Key: { 
                "username": username,
                "email": email
            },
            UpdateExpression: "SET #tickets = list_append(if_not_exists(#tickets, :empty_list), :ticket)",
            ExpressionAttributeNames: {
                "#tickets": "tickets"
            },
            ExpressionAttributeValues: {
                ":empty_list": [],
                ":ticket": [{
                    "created": created,
                    "description": `Ticket ${header} created ${created} by user ${username}`,
                    "subject": header,
                    "message": message,
                    "status": "pending",
                    "open": true,
                    "response": "",
                    "response_by": "",
                    "tags": tags
                }]
            },
            ReturnValues: "ALL_NEW"
        };
        
        result = await dynamo.update(params).promise();
        
        const response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", 
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": "true"
            },
            body: {
                success: {
                    message: "Successfully submitted the ticket"
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

