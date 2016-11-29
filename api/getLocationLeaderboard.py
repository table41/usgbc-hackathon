from __future__ import print_function
from usbgc_helpers import *

import json
import urllib
import boto3
from boto3.dynamodb.conditions import Key, Attr

def lambda_handler(event, context):
    print("Received event: " + json.dumps(event, indent=2))
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Leaderboards')
    location = event['pathParameters']['locID']
    items = table.scan(FilterExpression=Attr('locID').eq(location))['Items']
    sorted_list = sorted(items, reverse=True, key=lambda item: item['score'])
    return lambda_return(sorted_list)
