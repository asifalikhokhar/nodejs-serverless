'use strict'
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.getByUser = (event, context, callback) => {
  // fetch all todos from the database
  if (event.pathParameters.id == undefined) {
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: "UserId parameter missing",
    });
    return;
  }
  const query = {
    TableName: "campaigns",
    FilterExpression: "UserId = :id",
    ExpressionAttributeValues: {
      ":id": parseInt( event.pathParameters.id)
    }
  };
  
  dynamoDb.scan(query, (error, result) => {
    // handle potential errors
    if (error) {
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body:  JSON.stringify( error),
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body:  JSON.stringify( result.Items),
    };
    callback(null, response);
  });
}