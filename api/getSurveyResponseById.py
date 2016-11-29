from __future__ import print_function
from usgbc_helpers import *

import json
import urllib
import boto3

# handler
def lambda_handler(event, context):
    print("Received event: " + json.dumps(event, indent=2))

    ddb = boto3.client('dynamodb')

    response_id = event['pathParameters']['id']

    response = ddb.get_item(TableName='SurveyResponses', Key={'response_id': {'S':response_id}})['Item']

    return lambda_return(unmarshalJson(response))
