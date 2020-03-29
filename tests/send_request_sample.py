import requests

API_URL = "http://ec2-34-209-125-101.us-west-2.compute.amazonaws.com/api/dispatch"

# data to be sent to api
data = {"victimTypesInvolved": [
            "vehicle",
            "human",
            "cyclist"
        ],
        "numVictims": [
            1,
            1,
            1
        ],
        "lat": 49.886282,
        "lng": -119.476950,
        "address": "Bernard Ave & Gordon Dr, Kelowna BC"
        }

# sending post request and saving response as response object
r = requests.post(url = API_URL, data = data)