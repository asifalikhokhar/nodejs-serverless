const AWS = require('aws-sdk');
jest.mock("aws-sdk");

const mockScan = jest.fn();

class MockClient {
    constructor() {
        this.scan = mockScan
    }
}

AWS.DynamoDB.DocumentClient = MockClient;

const { list } = require('./campaigns');

describe('list campaigns', () => {
    beforeEach(() => {
        mockScan.mockClear();
    })

    // it('should throw exception when id is not passed', () => {
    //     expect(list).toThrow()
    // });

    it('should call dynamodb.scan with proper params', () => {
        list();
        expect(mockScan).toBeCalledWith({ "TableName": "campaigns" }, expect.any(Function))
    });

    it('should call callback with error', () => {

        const callback = jest.fn()
        list(null, null, callback);
        const scanCallback = mockScan.mock.calls[0][1];
        scanCallback({}, null);

        expect(callback).toBeCalledWith(null, {"body": "{}", "headers": {"Content-Type": "text/plain"}, "statusCode": 501})
    });

    it('should call callback with result', () => {
        const callback = jest.fn()
        list(null, null, callback);

         const scanCallback = mockScan.mock.calls[0][1];
        scanCallback(null, {Items: []});

        expect(callback).toBeCalledWith(null, {"body": "[]", "headers": {"Content-Type": "text/plain"}, "statusCode": 200})
    });

    // it('should call  with proper params', () => {
    //     expect(mockScan).toBeCalled()
    // });
})
