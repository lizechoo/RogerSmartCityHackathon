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
    // console.log("/dispatch endpoint called", req.body, "body end");
    // console.log("req headers", req.headers);
    
    const severity = (req.body.numVictims[0]*1) + (req.body.numVictims[1]*3) + (req.body.numVictims[2]*2);
    const severityThreshold = 5;

    pusher.trigger("my-channel", "my-event", {
        location: req.body.address,
        lat: req.body.lat,
        lng: req.body.lng,
        img: undefined,
        incidentType: "Collision",
        victims: req.body.victimTypesInvolved.join(" - "),
        severity: severity,
        isResponderDispatched: (severity >= severityThreshold) ? "Yes" : "No",
        time: new Date().toString(),
    });

    res.json({
        "message": (severity >= severityThreshold) ? "Dispatch successfully sent" : "Dispatch not required",
    });
});

module.exports = router;