const AWS = require('aws-sdk');
jest.mock("aws-sdk");

const mockQuery = jest.fn();

class MockClient {
    constructor() {
        this.query = mockQuery
    }
}

AWS.DynamoDB.DocumentClient = MockClient;

const { getSorted } = require('./campaignssorted');

describe('getSorted campaigns', () => {
    beforeEach(() => {
        mockQuery.mockClear();
    })

    it('should throw exception when id is not passed', () => {
        const callback = jest.fn()
        getSorted({pathParameters: {}}, null, callback);
        expect(callback).toBeCalledWith(null, {"body": "UserId parameter missing", "headers": {"Content-Type": "text/plain"}, "statusCode": 400})
    });

    it('should call dynamodb.scan with proper params', () => {
        getSorted({pathParameters: {id: 1}}, null, null);
        expect(mockQuery).toBeCalledWith({"ExpressionAttributeValues": {":id": 1}, "IndexName": "UserId-ScheduledTo-index", "KeyConditionExpression": "UserId = :id", "ScanIndexForward": true, "TableName": "campaigns"}, expect.any(Function))
    });

    it('should call callback with error', () => {

        const callback = jest.fn()
        getSorted({pathParameters: {id: "test"}}, null, callback);
        const queryCallback = mockQuery.mock.calls[0][1];
        queryCallback({}, null);

        expect(callback).toBeCalledWith(null, {"body": "{}", "headers": {"Content-Type": "text/plain"}, "statusCode": 501})
    });

    it('should call callback with result', () => {
        const callback = jest.fn()
        getSorted({pathParameters: {id: 1}}, null, callback);

         const queryCallback = mockQuery.mock.calls[0][1];
         queryCallback(null, {Items: []});

        expect(callback).toBeCalledWith(null, {"body": "[]", "statusCode": 200})
    });
})
