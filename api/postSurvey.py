from __future__ import print_function
from usgbc_helpers import *

import json
import urllib
import boto3

def lambda_handler(event, context):
    print("Received event: " + json.dumps(event, indent=2))

    ddb = boto3.client('dynamodb')
    paginator = ddb.get_paginator('scan')

    survey_list = list()

    for page in pages:
        print("Found Surveys:" + json.dumps(page['Items'], indent=2))
        for survey in page['Items']:
            survey_list += survey

    return survey_list
