const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, DeleteCommand } = require("@aws-sdk/lib-dynamodb");

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

  let payload;
  try {
    payload = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, headers: corsHeaders(), body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  const { userId, taskId } = payload;
  if (!userId || !taskId) {
    return { statusCode: 400, headers: corsHeaders(), body: JSON.stringify({ error: "userId and taskId required" }) };
  }

  await docClient.send(new DeleteCommand({
    TableName: "tasks-table",
    Key: { userId, taskId }
  }));

  return { statusCode: 200, headers: corsHeaders(), body: JSON.stringify({ message: "Task deleted" }) };
};

const corsHeaders = () => ({
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
});
