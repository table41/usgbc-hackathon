from __future__ import print_function
from geopy.distance import vincenty

import json
import urllib
import boto3

def unmarshalJson(node):
    data = {}
    data["M"] = node
    return unmarshalValue(data, True)

def unmarshalValue(node, mapAsObject):
    for key, value in node.items():
        if(key == "S" or key == "N"):
            return value
        if(key == "M" or key == "L"):
            if(key == "M"):
                if(mapAsObject):
                    data = {}
                    for key1,value1 in value.items():
                        data[key1] = unmarshalValue(value1, mapAsObject)
                    return data
            data = []
            for item in value:
                data.append(unmarshalValue(item, mapAsObject))
            return data

def lambda_return(body):
    return_object = {
        "statusCode": 200,
        "body": json.dumps(body)
    }
    return return_object

def location_within_range(current, survey):
    print(json.dumps(survey))
    survey_loc = (int(survey['lon']), int(survey['lat']))
    distance = vincenty(survey_loc, current).meters
    if distance <= int(survey['radius']):
        return distance
    else:
        return False

def extract_current_location(queryStringParameters):
    lon = queryStringParameters.get('lon', False)
    lat = queryStringParameters.get('lat', False)
    if lon and lat:
        return (int(lon), int(lat))
    else:
        return False


def lambda_handler(event, context):
    print("Received event: " + json.dumps(event, indent=2))

    current_location = extract_current_location(event['queryStringParameters'])
    ddb = boto3.client('dynamodb')
    paginator = ddb.get_paginator('scan')
    pages = paginator.paginate(TableName='Surveys')

    relevant_surveys = list()

    for page in pages:
        for survey in page['Items']:
            survey = unmarshalJson(survey)
            print(json.dumps(survey, indent=2))
            if current_location:
                distance = location_within_range(current_location, survey['location'])
                if distance:
                    print("Found Survey %s within range %s meters, distance %s" % (survey['survey_id'], survey['location']['radius'], distance))
                    relevant_surveys += survey['survey_id']
            else:
                relevant_surveys += survey['survey_id']

    return lambda_return(relevant_surveys)
