/**
 * Copyright 2010-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * This file is licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License. A copy of
 * the License is located at
 *
 * http://aws.amazon.com/apache2.0/
 *
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */
var AWS = require("aws-sdk");
// import AWS from "aws-sdk";

console.log("1");
AWS.config.update({
  region: "us-west-2",
  endpoint: "http://172.17.0.2:54823/",
});
console.log("2");
var dynamodb = new AWS.DynamoDB();
console.log("3");
var params = {
  TableName: "Movies",
  KeySchema: [
    { AttributeName: "year", KeyType: "HASH" }, //Partition key
    { AttributeName: "title", KeyType: "RANGE" }, //Sort key
  ],
  AttributeDefinitions: [
    { AttributeName: "year", AttributeType: "N" },
    { AttributeName: "title", AttributeType: "S" },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
};
console.log("4");
dynamodb.createTable(params, function (err, data) {
  if (err) {
    console.error(
      "Unable to create table. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log(
      "Created table. Table description JSON:",
      JSON.stringify(data, null, 2)
    );
  }
});
