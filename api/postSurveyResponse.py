from __future__ import print_function
from usgbc_helpers import *

import json
import urllib
import boto3
import googlemaps
import requests

def get_city_name(latitude, longitude):
    location_str = 'https://maps.googleapis.com/maps/api/geocode/json?latlng={0},{1}'.format(latitude,longitude)
    response = requests.get(location_str)
    resp_json_payload = response.json()
    address = resp_json_payload['results'][0]['address_components']
    for i in address:
        if 'locality' in i['types']:
            return i['short_name']

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
