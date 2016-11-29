from __future__ import print_function

import json
import urllib
import boto3
from boto3.dynamodb.conditions import Key, Attr

def unmarshalJson(node):
    data = {}
    data["M"] = node
    return unmarshalValue(data, True)

def unmarshalValue(node, mapAsObject):
    for key, value in node.items():
        if(key == "S" or key == "N"):
            return value
        if(key == "M" or key == "L"):
            if(key == "M"):
                if(mapAsObject):
                    data = {}
                    for key1,value1 in value.items():
                        data[key1] = unmarshalValue(value1, mapAsObject)
                    return data
            data = []
            for item in value:
                data.append(unmarshalValue(item, mapAsObject))
            return data

def lambda_return(body):
    return_object = {
        "statusCode": 200,
        "body": json.dumps(body)
    }
    return return_object

def extract_survey_id(queryStringParameters):
    if queryStringParameters == None:
        queryStringParameters = {}
    return queryStringParameters.get('survey_id', None)

def lambda_handler(event, context):
    print("Received event: " + json.dumps(event, indent=2))

    ddb = boto3.client('dynamodb')

    survey_id = extract_survey_id(event['queryStringParameters'])
    print("Got survey_id:", survey_id)

    survey_response_list = list()

    if survey_id is not None:
        query = ddb.query(TableName='SurveyResponses',
                          IndexName='survey_id-index',
                          KeyConditionExpression='survey_id = :val',
                          ExpressionAttributeValues={":val": {"S": survey_id}})
        # No pagination support. May not return all items if response > 1 MB
        for survey_response in query['Items']:
            print("Found SurveyResponse:" + json.dumps(survey_response, indent=2))
            survey_response_list.append(survey_response)
    else:
        paginator = ddb.get_paginator('scan')
        pages = paginator.paginate(TableName='SurveyResponses')
        for page in pages:
            print("Found SurveyResponses:" + json.dumps(page['Items'], indent=2))
            for survey_response in page['Items']:
                survey_response_list.append(survey_response)

    return lambda_return([unmarshalJson(item) for item in survey_response_list])
