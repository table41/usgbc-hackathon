from __future__ import print_function
from usgbc_helpers import *

import json
import urllib
import boto3
from boto3.dynamodb.conditions import Key, Attr

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
