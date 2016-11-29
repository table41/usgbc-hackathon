from __future__ import print_function

import json
import urllib
import boto3


def marshalNode(node):
    if isinstance(node, dict):
        return {k: marshalValue(v) for k, v in node.iteritems()}


def marshalValue(value):
    data = {}
    if isinstance(value, basestring):
        data["S"] = value
    elif isinstance(value, int) or isinstance(value, long) or isinstance(value, float):
        data["N"] = str(value)
    elif isinstance(value, list):
        data["L"] = [marshalValue(x) for x in value]
    elif isinstance(value, dict):
        data["M"] = {k: marshalValue(v) for k, v in value.iteritems()}
    return data


def lambda_handler(event, context):
    try:
        print("Received event: " + json.dumps(event, indent=2))

        ddb = boto3.client('dynamodb')

        item = json.loads(event['body'])
        response = ddb.put_item(TableName='Surveys', Item=marshalNode(item))

        return {
            "statusCode": "200",
            "body": json.dumps({"success": item['survey_id']})
        }
    except Exception as e:
        return {
            "statusCode": "500",
            "body": json.dumps({"error": str(e)})
        }
