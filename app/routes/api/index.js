const express = require('express');
const router = express.Router();
const config = require("../../config");

const Pusher = require("pusher");

const pusher = new Pusher({
    appId: config.pusher.appId,
    key: config.pusher.key,
    secret: config.pusher.secret,
    cluster: config.pusher.cluster,
    useTLS: config.pusher.useTLS,
});

router.post("/dispatch", (req, res) => {
    console.log("/dispatch endpoint called");
    
    pusher.trigger("my-channel", "my-event", {
        location: "Intersection at Granville St &  W Broadway",
        img: undefined,
        incidentType: "Vehicle Collision",
        victims: "Vehicle - Vehicle",
        severity: 5,
        isResponderDispatched: "Yes",
        time: new Date().toString(),
    });
    res.json({
        "message": "Dispatch successfully sent",
    });
});

module.exports = router;