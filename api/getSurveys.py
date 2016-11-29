from __future__ import print_function
from geopy.distance import vincenty
from usbgc_helpers import *

import json
import urllib
import boto3

def location_within_range(current, survey):
    print(json.dumps(survey))
    survey_loc = (int(survey['lon']), int(survey['lat']))
    distance = vincenty(survey_loc, current).meters
    if distance <= int(survey['radius']):
        if distance == 0:
            distance = 1
        return distance
    else:
        return False

def extract_current_location(queryStringParameters):
    if queryStringParameters == None:
        queryStringParameters = {}
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
            if current_location:
                distance = location_within_range(current_location, survey['location'])
                if distance:
                    print("Found Survey %s within range %s meters, distance %s" % (survey['survey_id'], survey['location']['radius'], distance))
                    relevant_surveys.append(survey['survey_id'])
            else:
                relevant_surveys.append(survey['survey_id'])

    return lambda_return(relevant_surveys)
