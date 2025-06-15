const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: ""
    };
  }

  const userId = event.queryStringParameters?.userId;
  const taskId = event.queryStringParameters?.taskId;
  if (!userId || !taskId) {
    return { statusCode: 400, headers: corsHeaders(), body: JSON.stringify({ error: "userId and taskId required" }) };
  }

  const result = await docClient.send(new GetCommand({
    TableName: "tasks-table",
    Key: { userId, taskId }
  }));

  return { statusCode: 200, headers: corsHeaders(), body: JSON.stringify(result.Item || {}) };
};

const corsHeaders = () => ({
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
});
