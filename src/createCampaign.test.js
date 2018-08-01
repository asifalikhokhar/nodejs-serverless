const AWS = require('aws-sdk');
jest.mock("aws-sdk");

const mockPut = jest.fn();

class MockClient {
    constructor() {
        this.put = mockPut
    }
}

AWS.DynamoDB.DocumentClient = MockClient;

const { create } = require('./createCampaign');

describe('create campaign', () => {
    beforeEach(() => {
        mockPut.mockClear();
    })

    it('should call callback with error if empty body passed', () => {

        const callback = jest.fn()
        create({body: {}}, null, callback);
        // const putCallback = mockPut.mock.calls[0][1];
        // putCallback({}, null);

        expect(callback).toBeCalledWith(null, {"body": 'Couldn\'t create campaign.', "headers": {"Content-Type": "text/plain"}, "statusCode": 400})
    });

    it('should call dynamodb.put with proper params', () => {
        create({body: {
            "id" : "b82e9430-94b2-11e8-b7b9-a33191e5987e",
            "Name": "Xmas Campaign",
            "UserId": 3,
            "ScheduledTo": 1533033536000,
            "Status": "Sent",
            "SendTo": "list22",
            "Content": "Merry Xmas"
          }}, null, null);


        expect(mockPut.mock.calls[0][0]).toMatchObject( { 
        "TableName": 'campaigns',
        "Item" : {
        "Name": "Xmas Campaign",
        "UserId": 3,
        "ScheduledTo": 1533033536000,
        "Status": "Sent",
        "SendTo": "list22",
        "Content": "Merry Xmas"} })
    });
})
