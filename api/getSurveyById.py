from __future__ import print_function

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

def lambda_handler(event, context):
    print("Received event: " + json.dumps(event, indent=2))

    ddb = boto3.client('dynamodb')

    survey_id = event['pathParameters']['id']

    survey = ddb.get_item(TableName='Surveys', Key={'survey_id': {'S':survey_id}})['Item']

    return unmarshalJson(survey)
