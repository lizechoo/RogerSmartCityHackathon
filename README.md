
# Hermes+ (UBC - Rogers 5G Smart City Hackathon) - 3rd Place

## Inspiration
The inspiration for this project came from discovering the slow dispatch time for emergency responders around the world. We were also motivated by the potential of 5G and Multi-Access Edge Computing (MEC) and its capabilities of providing reliable low-latency and high bandwidth connections. We thought we could leverage the low-latency to solve a social issue that could ultimately save lives.

## What it does?
We created a prototyped web dashboard and mobile app for dispatchers and emergency responders to receive incident alerts immediately after they happen. 

## How we built it?
For the hackathon, we were given sample LiDAR data that we analyzed. From the analysis, we performed collision detection on vehicles, pedestrians and cyclists. After processing the data, we send a request to our custom API hosted on the AWS Cloud. When the request is received, we used a third-party library (Pusher) to send the event through a websocket to our web dashboard & mobile app. 

## Challenges we ran into
This hackathon took place in the middle of the self-isolation period due to the coronavirus so we had to coordinate with each other completely online. We have also never worked with LiDAR data or worked with MEC or 5G related technologies so the learning curve was steep but valuable.

## What we learned
We learned the great potential of 5G capabilities and how it likely marks the next technological revolution.
