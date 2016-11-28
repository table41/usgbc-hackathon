from __future__ import print_function

import json
import urllib
import boto3

def lambda_handler(event, context):
    try:
        print("Received event: " + json.dumps(event, indent=2))

        ddb = boto3.resource('dynamodb')
        table = ddb.Table('SurveyResposes')

        item = json.loads(event['body'])
        table.put_item(Item=item)

        return {
            "statusCode": "200",
            "body": json.dumps({"success": item.response_id})
        }
    except Exception as e:
        return {
            "statusCode": "500",
            "body": json.dumps({"error": str(e)})
        }
