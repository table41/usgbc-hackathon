from __future__ import print_function
from usgbc_helpers import *

import json
import urllib
import decimal
import boto3
from boto3.dynamodb.conditions import Key, Attr

def lambda_handler(event, context):
    print("Received event: " + json.dumps(event, indent=2))
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Leaderboards')
    response = table.scan()
    items = response['Items']
    sorted_results = sorted(items, reverse=True, key=lambda item: item['score'])
    return lambda_return(sorted_results)
