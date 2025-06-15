const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, UpdateCommand } = require("@aws-sdk/lib-dynamodb");

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

  const { userId, taskId, title, description, completed } = payload;
  if (!userId || !taskId) {
    return { statusCode: 400, headers: corsHeaders(), body: JSON.stringify({ error: "userId and taskId required" }) };
  }

  const updateExp = [];
  const expAttr = {};
  if (title !== undefined) { updateExp.push("title = :title"); expAttr[":title"] = title; }
  if (description !== undefined) { updateExp.push("description = :desc"); expAttr[":desc"] = description; }
  if (completed !== undefined) { updateExp.push("completed = :comp"); expAttr[":comp"] = completed; }

  await docClient.send(new UpdateCommand({
    TableName: "tasks-table",
    Key: { userId, taskId },
    UpdateExpression: "SET " + updateExp.join(", "),
    ExpressionAttributeValues: expAttr
  }));

  return {
    statusCode: 200,
    headers: corsHeaders(),
    body: JSON.stringify({ message: "Task updated" })
  };
};

const corsHeaders = () => ({
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
});
