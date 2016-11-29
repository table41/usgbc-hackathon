from __future__ import print_function
from usgbc_helpers import *

import json
import urllib
import boto3
from boto3.dynamodb.conditions import Key, Attr

def lambda_handler(event, context):
    print("Received event: " + json.dumps(event, indent=2))
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Leaderboards')
    userID = event['pathParameters']['userId']
    item = table.get_item(Key={'userID': userID})['Item']
    return lambda_return(item)
