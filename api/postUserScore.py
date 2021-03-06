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
    points_to_add = event['pathParameters']['score']
    item = table.get_item(Key={'userID': userID})['Item']
    score = item.get(u'score')
    new_score = score + points_to_add
    table.update_item(Key={'userID': userID}, AttributeUpdates={"score":{"Action":"PUT","Value":new_score}})
    updated_user = table.get_item(Key={'userID':userID})['Item']
    return lambda_return(updated_user)
