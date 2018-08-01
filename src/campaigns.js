const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const params = {
  TableName: "campaigns",
};

module.exports.list = (event, context, callback) => {
  // fetch all todos from the database
  dynamoDb.scan(params, (error, result) => {
    // handle potential errors
    if (error) {
      // console.error(error);
      callback(null,  {
        statusCode: error.statusCode || 400,
        headers: { 'Content-Type': 'text/plain' },
        body:  JSON.stringify(error),
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify( result.Items),
    };
    callback(null, response);
  });
}