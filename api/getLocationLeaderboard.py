from __future__ import print_function

import json
import urllib
import decimal
import boto3
from boto3.dynamodb.conditions import Key, Attr

class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            if o % 1 > 0:
                return float(o)
            else:
                return int(o)
        return super(DecimalEncoder, self).default(o)

def lambda_return(body):
    return_object = {
        "statusCode": 200,
        "body": json.dumps(body, cls=DecimalEncoder)
    }
    return return_object

def lambda_handler(event, context):
    print("Received event: " + json.dumps(event, indent=2))

    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Leaderboards')
    location = event['pathParameters']['locID']
    items = table.scan(FilterExpression=Attr('locID').eq(location))['Items']
    sorted_list = sorted(items, reverse=True, key=lambda item: item['score'])
    return lambda_return(sorted_list)
