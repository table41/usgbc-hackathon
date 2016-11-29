from __future__ import print_function
from usbgc_helpers import *

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
        print("Found SurveyResponses:" + json.dumps(page['Items'], indent=2))
        for survey_response in page['Items']:
            survey_response_list.append(survey_response)

    return lambda_return([unmarshalJson(item) for item in survey_response_list])
