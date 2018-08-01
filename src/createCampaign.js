'use strict';
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  
  const data = JSON.parse( event.body);
  if (typeof data.Name !== 'string' || typeof data.UserId !== 'number'
  || typeof data.ScheduledTo !== 'number' || typeof data.id !== 'string'
  || typeof data.Content !== 'string' ) {

    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({message: 'Couldn\'t create campaign.'}),
    });
    return;
  }
  const item = {
    "id": data.id,
    "Name": data.Name,
    "UserId": data.UserId,
    "CreatedAt": (new Date() / 1000) * 1000,
    "ScheduledTo": data.ScheduledTo,
    "Status": data.Status,
    "SendTo": data.SendTo,
    "Content": data.Content
  }
  const params = {
    TableName: "campaigns",
    Item: item
  };

  // write the todo to the database
  dynamoDb.put(params, (error) => {
    // handle potential errors
    console.error(error);
    if (error) {
      callback(null, {
        statusCode: 403,
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(error)
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body:  JSON.stringify( params.Item),
    };
    callback(null, response);
  });
};
