from __future__ import print_function
from usgbc_helpers import *

import json
import urllib
import boto3

def lambda_handler(event, context):
    try:
        print("Received event: " + json.dumps(event, indent=2))

        ddb = boto3.client('dynamodb')

        item = json.loads(event['body'])
        response = ddb.put_item(TableName='SurveyResponses', Item=marshalNode(item))

        return {
            "statusCode": "200",
            "body": json.dumps({"success": item['response_id']})
        }
    except Exception as e:
        return {
            "statusCode": "500",
            "body": json.dumps({"error": str(e)})
        }
