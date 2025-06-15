const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, QueryCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
  const userId = event.queryStringParameters?.userId;
  console.log("➡️ getUserTasks invoked with userId:", userId);

  if (!userId) {
    return {
      statusCode: 400,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "userId required" })
    };
  }

  try {
    const result = await docClient.send(new QueryCommand({
      TableName: "tasks-table",
      KeyConditionExpression: "userId = :uid",
      ExpressionAttributeValues: { ":uid": userId }
    }));

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(result.Items || [])
    };
  } catch (err) {
    console.error("❌ DynamoDB query failed:", err);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "Failed to fetch tasks" })
    };
  }
};
