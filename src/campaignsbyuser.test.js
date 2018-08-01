const AWS = require('aws-sdk');
jest.mock("aws-sdk");

const mockScan = jest.fn();

class MockClient {
    constructor() {
        this.scan = mockScan
    }
}

AWS.DynamoDB.DocumentClient = MockClient;

const { getByUser } = require('./campaignsbyuser');

describe('getByUser campaigns', () => {
    beforeEach(() => {
        mockScan.mockClear();
    })

    it('should throw exception when id is not passed', () => {
        const callback = jest.fn()
        getByUser({pathParameters: {}}, null, callback);
        expect(callback).toBeCalledWith(null, {"body": "UserId parameter missing", "headers": {"Content-Type": "text/plain"}, "statusCode": 400})
    });

    it('should call dynamodb.scan with proper params', () => {
        getByUser({pathParameters: {id: 1}}, null, null);
        expect(mockScan).toBeCalledWith({"ExpressionAttributeValues": {":id": 1}, "FilterExpression": "UserId = :id", "TableName": "campaigns"}, expect.any(Function))
    });

    it('should call callback with error', () => {

        const callback = jest.fn()
        getByUser({pathParameters: {id: "test"}}, null, callback);
        const scanCallback = mockScan.mock.calls[0][1];
        scanCallback({}, null);

        expect(callback).toBeCalledWith(null, {"body": "{}", "headers": {"Content-Type": "text/plain"}, "statusCode": 501})
    });

    it('should call callback with result', () => {
        const callback = jest.fn()
        getByUser({pathParameters: {id: 1}}, null, callback);

         const scanCallback = mockScan.mock.calls[0][1];
        scanCallback(null, {Items: []});

        expect(callback).toBeCalledWith(null, {"body": "[]", "statusCode": 200})
    });
})
