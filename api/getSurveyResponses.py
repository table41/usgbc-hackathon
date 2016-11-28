from __future__ import print_function

import json
import urllib
import boto3

def lambda_handler(event, context):
    print("Received event: " + json.dumps(event, indent=2))

    ddb = boto3.client('dynamodb')
    paginator = ddb.get_paginator('scan')
    pages = paginator.paginate(TableName='SurveyResponses')

    survey_response_list = list()

    for page in pages:
        print("Found SurveyResonses:" + json.dumps(page['Items'], indent=2))
        for survey_response in page['Items']:
            survey_response_list += survey

    return survey_response_list
