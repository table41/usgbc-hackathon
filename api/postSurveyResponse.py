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
        userID = item['user_id']
        response = ddb.put_item(TableName='SurveyResponses', Item=marshalNode(item))

        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('Leaderboards')
        points_to_add = 5
        user_item = table.get_item(Key={'userID': userID})['Item']
        score = user_item.get(u'score')
        new_score = score + points_to_add
        table.update_item(Key={'userID': userID}, AttributeUpdates={"score":{"Action":"PUT","Value":new_score}})
        updated_user = table.get_item(Key={'userID':userID})['Item']

        return {
            "statusCode": "200",
            "body": json.dumps({"success": item['response_id']})
        }
    except Exception as e:
        return {
            "statusCode": "500",
            "body": json.dumps({"error": str(e)})
        }
