from __future__ import print_function
from usbgc_helpers import *

import json
import urllib
import boto3

# handler
def lambda_handler(event, context):
    print("Received event: " + json.dumps(event, indent=2))

    ddb = boto3.client('dynamodb')

    survey_id = event['pathParameters']['id']

    survey = ddb.get_item(TableName='Surveys', Key={'survey_id': {'S':survey_id}})['Item']

    return lambda_return(unmarshalJson(survey))
