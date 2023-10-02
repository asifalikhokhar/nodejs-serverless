A simple and easy to understand example of Nodejs serverless programming

# nodejs-serverless example
nodejs-serverless example
endpoints:
  POST - https://wsfwc8n2s6.execute-api.us-east-1.amazonaws.com/dev/campaigns/create
  Required body => {"Name": "Xmas Campaign","UserId": 4,"ScheduledTo": 1533033536000,"Status": "Sent","SendTo": "list22","Content": "Merry Xmas", "id" : "b82e9430-94b2-11e8-b7b9-a33191f69012"}
  
  GET - https://wsfwc8n2s6.execute-api.us-east-1.amazonaws.com/dev/campaigns/get
  
  GET - https://wsfwc8n2s6.execute-api.us-east-1.amazonaws.com/dev/campaigns/getByUser/{id}
  Required URL parameter => id of User to get campaigns of
  
  GET - https://wsfwc8n2s6.execute-api.us-east-1.amazonaws.com/dev/campaigns/getSorted/{id}
  Required URL parameter => id of User to get campaigns of
