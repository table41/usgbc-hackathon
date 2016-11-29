import json
import decimal
import googlemaps
import requests

class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            if o % 1 > 0:
                return float(o)
            else:
                return int(o)
        return super(DecimalEncoder, self).default(o)

def marshalNode(node):
    if isinstance(node, dict):
        return {k: marshalValue(v) for k, v in node.iteritems()}


def marshalValue(value):
    data = {}
    if isinstance(value, basestring):
        data["S"] = value
    elif isinstance(value, int) or isinstance(value, long) or isinstance(value, float):
        data["S"] = str(value)
    elif isinstance(value, list):
        data["L"] = [marshalValue(x) for x in value]
    elif isinstance(value, dict):
        data["M"] = {k: marshalValue(v) for k, v in value.iteritems()}
    return data

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
        "headers": {
            "Access-Control-Allow-Origin": "*"
        },
        "statusCode": 200,
        "body": json.dumps(body, cls=DecimalEncoder)
    }
    return return_object

def get_city_name(latitude, longitude):
    location_str = 'https://maps.googleapis.com/maps/api/geocode/json?latlng={0},{1}'.format(latitude,longitude)
    response = requests.get(location_str)
    resp_json_payload = response.json()
    address = resp_json_payload['results'][0]['address_components']
    for i in address:
        if 'locality' in i['types']:
            return i['short_name']
