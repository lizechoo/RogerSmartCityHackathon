import requests

API_URL = "http://ec2-34-209-125-101.us-west-2.compute.amazonaws.com/api/dispatch"


def send_alert(address, type1, type2):

    vehicle = 0
    human = 0
    cyclist = 0

    victim_involved = []

    # Human
    if(type1 == 2):
        human += 1
        victim_involved.append("Human")
    if(type2 == 2):
        human += 1
        victim_involved.append("Human")

    # vehicle
    if (type1 == 1):
        vehicle += 1
        victim_involved.append("Vehicle")
    if (type2 == 1):
        vehicle += 1
        victim_involved.append("Vehicle")

    # cyclist
    if (type1 == 3):
        cyclist += 1
        victim_involved.append("Cyclist")
    if (type2 == 3):
        cyclist += 1
        victim_involved.append("Cyclist")

    # data to be sent to api
    data = {"victimTypesInvolved": victim_involved,
        "numVictims": [
            vehicle,
            human,
            cyclist
        ],
        "lat": address[0],
        "lng": address[1],
        "address": address[2]
    }

    # sending post request and saving response as response object
    r = requests.post(url=API_URL, data=data)
    return