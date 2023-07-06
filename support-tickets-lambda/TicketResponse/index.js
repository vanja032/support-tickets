const {createHash} = require("crypto");
const jwt = require("jsonwebtoken");

const key = createHash('sha256').update("mykey").digest('hex');

const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient({region: "us-east-1"});


const handler = async(event, context) => {
    try{
        // CHeck if all parameters are set
        if(!event.token || !event.response || !event.user || !event.email || event.ticket_id == undefined || event.ticket_id == null){
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
            throw new Error("Error during user authentication");
        }
        
        // Appending the ticket response to the user ticket
        const user = event.user.toString().trim();
        const email = event.email.toString().trim();
        const ticket_id = event.ticket_id;
        const ticket_response = event.response.toString().trim();
        
        params = {
            TableName: "users",
            Key: { 
                "username": user,
                "email": email
            },
            UpdateExpression: `SET #tickets[${ticket_id}].#response = :ticket_response, #tickets[${ticket_id}].#response_by = :ticket_response_by, #tickets[${ticket_id}].#status = :ticket_status, #tickets[${ticket_id}].#open = :open_ticket`,
            ExpressionAttributeNames: {
                "#tickets": "tickets",
                "#response": "response",
                "#response_by": "response_by",
                "#status": "status",
                "#open": "open"
            },
            ExpressionAttributeValues: {
                ":ticket_response": ticket_response,
                ":ticket_response_by": username,
                ":ticket_status": "closed",
                ":open_ticket": false
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
                result: {
                    ticket_id: ticket_id,
                    ticket_status: result.Attributes.tickets[ticket_id].status,
                    open: result.Attributes.tickets[ticket_id].open,
                    response: ticket_response,
                    response_by: username
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
